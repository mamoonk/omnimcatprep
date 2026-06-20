import type { McatSection } from "./aamc-taxonomy";

export type PassageSourceType = "public-domain" | "oer";

export interface Passage {
  id: string;
  section: McatSection;
  sourceType: PassageSourceType;
  sourceRef: string;
  title: string;
  body: string;
  wordCount: number;
  readingLevel?: string;
}
