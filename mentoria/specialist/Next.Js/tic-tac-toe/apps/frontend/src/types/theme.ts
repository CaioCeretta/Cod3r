export const colorVariants = ["primary", "secondary", "light", "dark"] as const;

export type ColorVariant = (typeof colorVariants)[number];