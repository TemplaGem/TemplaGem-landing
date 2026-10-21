export type Language = "uk" | "en";
export type ThemeMode = "dark" | "light";
export type SandboxTab = "overlay" | "popup";
export type InstallTab = "release" | "source";

export type SortOption =
  | "created-desc"
  | "created-asc"
  | "title-asc"
  | "title-desc"
  | "updated-desc";

export type IconColor = "blue" | "purple" | "green" | "amber";

export interface PromptItem {
  id: string;
  title: string;
  titleEn: string;
  icon: "bot" | "code" | "mail" | "book" | "sparkles";
  color: IconColor;
  text: string;
  textEn: string;
  tags: string[];
  tagsEn: string[];
  createdAt: string;
  updatedAt: string;
}

export interface LocalizedPromptItem extends PromptItem {
  displayTitle: string;
  displayText: string;
  displayTags: string[];
}
