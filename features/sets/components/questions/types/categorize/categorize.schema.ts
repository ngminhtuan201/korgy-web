import { QuestionType } from "@/features/sets/set-service";
import { z } from "zod";

export const categorizeItemSchema = z.object({
  text: z.string().optional(),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
});

export const categorizeCategorySchema = z.object({
  title: z.string(),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  items: z.array(categorizeItemSchema).min(1),
});

export const categorizeSchema = z.object({
  type: z.literal(QuestionType.CATEGORIZE),
  title: z.string(),
  explanation: z
    .object({
      text: z.string().optional(),
      imageUrl: z.string().optional(),
      audioUrl: z.string().optional(),
      duration: z.number().optional(),
    })
    .optional(),
  points: z.number(),
  timeLimit: z.number().optional(),
  categories: z.array(categorizeCategorySchema).min(2),
});

export type CategorizeItem = z.infer<typeof categorizeItemSchema>;
export type CategorizeCategory = z.infer<typeof categorizeCategorySchema>;
export type CategorizeQuestion = z.infer<typeof categorizeSchema>;
