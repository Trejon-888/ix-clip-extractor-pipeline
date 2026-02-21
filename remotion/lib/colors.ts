/**
 * Color scheme configuration for Script17 and future compositions
 * Orange-based accent color replacing lime green
 */

export const COLORS = {
  // Primary orange accent
  primary: "#FF6B00",
  primaryLight: "#FF8533",
  primaryDark: "#CC5500",
  primaryGlow: "rgba(255, 107, 0, 0.4)",

  // Secondary colors
  secondary: "#FF9500",
  accent: "#FFB800",

  // Neutral palette
  dark: "#0D0D0D",
  darkGray: "#1A1A1A",
  mediumGray: "#333333",
  gray: "#666666",
  lightGray: "#999999",
  silver: "#CCCCCC",
  offWhite: "#F5F5F5",
  white: "#FFFFFF",

  // Semantic colors
  error: "#FF4444",
  success: "#00CC66",
  warning: "#FFB800",

  // Gradient definitions
  gradients: {
    primary: "linear-gradient(135deg, #FF6B00 0%, #FF9500 100%)",
    dark: "linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%)",
    glow: "radial-gradient(circle, rgba(255, 107, 0, 0.3) 0%, transparent 70%)",
  },
} as const;

// Legacy alias for backward compatibility
export const ORANGE = COLORS.primary;
export const DARK = COLORS.dark;
