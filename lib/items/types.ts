export const itemCategories = ["top", "bottom", "dress", "outerwear", "shoes", "bag"] as const;
export const itemSeasons = ["spring", "summer", "autumn", "winter"] as const;
export const itemStatuses = ["active", "idle", "review"] as const;
export const sourcePlatforms = ["manual", "taobao", "jd"] as const;

export type ItemCategory = (typeof itemCategories)[number];
export type ItemSeason = (typeof itemSeasons)[number];
export type ItemStatus = (typeof itemStatuses)[number];
export type SourcePlatform = (typeof sourcePlatforms)[number];
