import type { Language, LocalizedPromptItem, PromptItem } from "../types";

export const INITIAL_PROMPTS: PromptItem[] = [
  {
    id: "p-summary",
    title: "Конспект матеріалу",
    titleEn: "Structured Study Notes",
    icon: "bot",
    color: "blue",
    text: "Зроби детальний і структурований конспект за темою: {{тема}}\n\nФормат:\n1. Коротке резюме (2-3 речення)\n2. Ключові поняття та визначення\n3. Основні тези списком\n\nМатеріал:\n{{матеріал}}",
    textEn:
      "Create structured study notes on: {{topic}}\n\nFormat:\n1. Executive summary (2-3 sentences)\n2. Key concepts and definitions\n3. Core takeaways\n\nSource material:\n{{source_text}}",
    tags: ["навчання", "конспект"],
    tagsEn: ["study", "notes"],
    createdAt: "2026-10-18T10:00:00Z",
    updatedAt: "2026-10-19T14:00:00Z"
  },
  {
    id: "p-refactor",
    title: "Code Review & Refactor",
    titleEn: "Code Review & Refactor",
    icon: "code",
    color: "purple",
    text: "Ти Senior {{мова_програмування}} розробник. Проведи рев'ю цього коду:\n\n{{код}}\n\nЗнайди потенційні баги, вузькі місця продуктивності та запропонуй чистий відрефакторений варіант.",
    textEn:
      "Act as a Senior {{language}} engineer. Review and refactor this code:\n\n{{code_snippet}}\n\nIdentify edge-case bugs, performance bottlenecks, and provide a clean refactored implementation.",
    tags: ["код", "dev"],
    tagsEn: ["coding", "dev"],
    createdAt: "2026-10-19T09:30:00Z",
    updatedAt: "2026-10-20T08:15:00Z"
  },
  {
    id: "p-email",
    title: "Діловий лист (Email)",
    titleEn: "Executive Email Draft",
    icon: "mail",
    color: "green",
    text: "Напиши чіткий діловий лист для {{одержувач}}.\nМета листа: {{мета}}\nТон: {{тон}}\nЗапропонуй 2 варіанти теми (Subject) та текст листа.",
    textEn:
      "Write a concise professional email to {{recipient}}.\nGoal: {{goal}}\nTone: {{tone}}\nProvide 2 subject line options and the email body.",
    tags: ["робота", "email"],
    tagsEn: ["work", "email"],
    createdAt: "2026-10-15T12:00:00Z",
    updatedAt: "2026-10-17T18:00:00Z"
  },
  {
    id: "p-english",
    title: "Пояснення граматики / лексики",
    titleEn: "Language Tutor & Quiz",
    icon: "book",
    color: "amber",
    text: "Поясни правило або вираз «{{вираз}}» для рівня {{рівень}}.\nНаведи 5 живих прикладів у реченнях, типові помилки та 3 тестові речення для самоперевірки.",
    textEn:
      "Explain the phrase or rule '{{expression}}' for level {{level}}.\nProvide 5 natural examples, common pitfalls, and a 3-question mini quiz.",
    tags: ["навчання", "мови"],
    tagsEn: ["study", "language"],
    createdAt: "2026-10-12T16:20:00Z",
    updatedAt: "2026-10-16T11:10:00Z"
  }
];

export function localizePrompt(prompt: PromptItem, lang: Language): LocalizedPromptItem {
  const isEn = lang === "en";
  return {
    ...prompt,
    displayTitle: isEn && prompt.titleEn ? prompt.titleEn : prompt.title,
    displayText: isEn && prompt.textEn ? prompt.textEn : prompt.text,
    displayTags: isEn && prompt.tagsEn ? prompt.tagsEn : prompt.tags
  };
}
