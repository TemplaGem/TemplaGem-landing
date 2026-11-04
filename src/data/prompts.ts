import type { PromptItem } from "../types";

export const INITIAL_PROMPTS: PromptItem[] = [
  {
    id: "p-refactor",
    title: "Code Review & Refactor",
    icon: "code",
    color: "purple",
    text: "Act as a Senior {{language}} engineer. Review and refactor this code:\n\n{{code_snippet}}\n\nIdentify edge-case bugs, performance bottlenecks, and provide a clean refactored implementation.",
    tags: ["coding"],
    createdAt: "2026-10-19T09:30:00Z",
    updatedAt: "2026-10-20T08:15:00Z"
  },
  {
    id: "p-summary",
    title: "Structured Study Notes",
    icon: "bot",
    color: "blue",
    text: "Create structured study notes on: {{topic}}\n\nFormat:\n1. Executive summary (2-3 sentences)\n2. Key concepts and definitions\n3. Core takeaways in bullet points\n\nSource material:\n{{source_text}}",
    tags: ["study"],
    createdAt: "2026-10-18T10:00:00Z",
    updatedAt: "2026-10-19T14:00:00Z"
  },
  {
    id: "p-email",
    title: "Executive Email Draft",
    icon: "mail",
    color: "green",
    text: "Write a concise professional email to {{recipient}}.\nGoal: {{goal}}\nTone: {{tone}}\nProvide 2 subject line options and the complete email body.",
    tags: ["work"],
    createdAt: "2026-10-15T12:00:00Z",
    updatedAt: "2026-10-17T18:00:00Z"
  },
  {
    id: "p-tutor",
    title: "Language & Concept Tutor",
    icon: "book",
    color: "amber",
    text: "Explain the concept or rule '{{concept}}' for level {{level}}.\nProvide 5 natural real-world examples, common pitfalls, and a 3-question mini quiz.",
    tags: ["learning"],
    createdAt: "2026-10-12T16:20:00Z",
    updatedAt: "2026-10-16T11:10:00Z"
  },
  {
    id: "p-arch",
    title: "Architecture Decision (ADR)",
    icon: "sparkles",
    color: "purple",
    text: "Write an Architecture Decision Record (ADR) for {{decision_topic}}.\nContext: {{context}}\nConsidered Options: {{options}}\nChosen Decision & Rationale: {{decision}}\nConsequences & Trade-offs: {{tradeoffs}}",
    tags: ["coding", "work"],
    createdAt: "2026-10-10T14:00:00Z",
    updatedAt: "2026-10-14T17:30:00Z"
  }
];
