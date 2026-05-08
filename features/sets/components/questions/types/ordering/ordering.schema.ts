import { QuestionType } from "@/features/sets/set-service";
import { z } from "zod";

export const orderingItemSchema = z.object({
  text: z.string(),
  imageUrl: z.string().optional(),
});

export const orderingSchema = z.object({
  type: z.literal(QuestionType.ORDERING),
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
  items: z.array(orderingItemSchema).min(2),
});

export type OrderingItem = z.infer<typeof orderingItemSchema>;
export type OrderingQuestion = z.infer<typeof orderingSchema>;
