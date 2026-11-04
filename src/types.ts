export type ThemeMode = "dark" | "light";
export type SandboxTab = "overlay" | "popup";

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
  icon: "bot" | "code" | "mail" | "book" | "sparkles";
  color: IconColor;
  text: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
