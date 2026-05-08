import { QuestionType } from "@/features/sets/set-service";
import { z } from "zod";

export const matchingItemSchema = z.object({
  text: z.string().optional(),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
});

export const matchingPairSchema = z.object({
  left: matchingItemSchema,
  right: matchingItemSchema,
});

export const matchingSchema = z.object({
  type: z.literal(QuestionType.MATCHING),
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
  pairs: z.array(matchingPairSchema).min(1),
});

export type MatchingItem = z.infer<typeof matchingItemSchema>;
export type MatchingPair = z.infer<typeof matchingPairSchema>;
export type MatchingQuestion = z.infer<typeof matchingSchema>;
