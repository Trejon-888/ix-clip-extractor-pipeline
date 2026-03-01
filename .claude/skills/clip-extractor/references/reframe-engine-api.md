# Reframe Engine API Reference

## Package: `tools/clip_extractor/`

### Core Pipeline (`core/pipeline.py`)

```python
# Full reframe: extract (optional) → analyze → render
reframe(
    video_path: str,           # Input video
    output_path: str,          # Output directory
    config_path: str = None,   # Config YAML override
    output_format: str = "9x16",  # "9x16" or "1x1"
    start_sec: float = None,   # Extract clip start (optional)
    end_sec: float = None,     # Extract clip end (optional)
) -> str  # Returns path to reframed video

# Analyze only (no render)
analyze(
    video_path: str,
    config_path: str = None,
    output_format: str = "9x16",
    crop_path_output: str = None,
) -> CropPath

# Render from existing crop_path.json
render_from_crop_path(
    video_path: str,
    crop_path_file: str,
    output_path: str,
    config_path: str = None,
) -> str

# Extract a clip segment
extract_clip(
    source_video: str,
    output_path: str,
    start_sec: float,
    end_sec: float,
) -> None
```

### Detection (`detection/face_detector.py`)

```python
class FaceDetector(DetectorBase):
    def __init__(self, config: dict)
    def detect(self, frame: np.ndarray) -> Optional[BoundingBox]
    def detect_all(self, frame: np.ndarray, max_faces: int = 3) -> list[BoundingBox]
    def close(self) -> None

@dataclass
class BoundingBox:
    x_center: float   # 0-1 normalized
    y_center: float
    width: float
    height: float
    confidence: float
```

### Tracking (`tracking/`)

```python
class EMASmoother:
    def __init__(self, alpha: float = 0.12)
    def smooth(self, x: float, y: float) -> tuple[float, float]
    def reset(self) -> None

class DeadzoneFilter:
    def __init__(self, threshold_pct: float = 0.05, vertical_threshold_pct: float = None)
    def apply(self, x: float, y: float) -> tuple[float, float]
    def reset(self) -> None
```

### Crop (`crop/`)

```python
class CropCalculator:
    def __init__(self, source_w: int, source_h: int, output_format: str = "9x16")
    def compute(self, face_x_norm: float, face_y_norm: float = 0.5) -> CropWindow
    @property
    def output_dimensions(self) -> tuple[int, int]

@dataclass
class CropWindow:
    x: int
    y: int
    width: int
    height: int

# I/O
save_crop_path(crop_path: CropPath, output_file: str) -> None
load_crop_path(input_file: str) -> CropPath

# Rendering
render_with_crop_path(video_path, crop_path, output_path, config) -> None
```

### Layout Detection (`detection/layout_detector.py`)

```python
class LayoutType(Enum):
    SPLIT_SCREEN = "split_screen"
    CLOSE_UP = "close_up"

@dataclass
class LayoutSegment:
    layout: LayoutType
    start_frame: int
    end_frame: int
    start_sec: float
    end_sec: float

# Classify a single frame by face data
classify_frame(
    faces: list[dict],           # all_faces from CropKeyframe
    face_size_thresh: float = 0.06,
    spread_thresh: float = 0.15,
) -> LayoutType

# Detect layout segments across entire video
detect_segments(
    keyframes: list[CropKeyframe],
    fps: float,
    config: dict = {},           # dynamic_layout config section
) -> list[LayoutSegment]
```

### Dynamic Split Renderer (`crop/split_renderer.py`)

```python
# Standard static split (existing)
render_split_screen(video_path, crop_path, output_path, config) -> None

# Dynamic podcast layout (Phase 6)
render_dynamic_podcast(
    video_path: str,
    crop_path: CropPath,
    output_path: str,
    config: dict,
    layout_segments: list[LayoutSegment],
) -> None
# Split-screen segments: per-frame DNN face detection, Kalman smoothing
# Close-up segments: standard 9:16 crop from keyframes
# Transitions: alpha crossfade between layout modes
```

### Utils (`utils/`)

```python
# Video metadata
get_video_info(video_path: str) -> VideoInfo

@dataclass
class VideoInfo:
    width: int
    height: int
    fps: float
    duration: float
    total_frames: int
    codec: str

# Frame reading
read_frames(video_path, sample_rate=6, start_frame=0, end_frame=None)
    -> Generator[tuple[int, np.ndarray], None, None]

extract_single_frame(video_path: str, frame_index: int) -> np.ndarray

interpolate_positions(sampled: dict, total_frames: int, method="cubic")
    -> dict[int, tuple[float, float]]
```
