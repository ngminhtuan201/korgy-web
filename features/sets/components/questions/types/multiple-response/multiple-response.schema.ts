import { QuestionType } from "@/features/sets/set-service";
import { z } from "zod";

export const multipleResponseOptionSchema = z.object({
  text: z.string(),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  isCorrect: z.boolean(),
});

export const multipleResponseSchema = z.object({
  type: z.literal(QuestionType.MULTIPLE_RESPONSE),
  title: z.string(),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  explanation: z
    .object({
      text: z.string().optional(),
      imageUrl: z.string().optional(),
      audioUrl: z.string().optional(),
      duration: z.number().optional(),
    })
    .optional(),
  points: z.number(),
  timeLimit: z.number(),
  options: z.array(multipleResponseOptionSchema).min(2),
});

export type MultipleResponseOption = z.infer<typeof multipleResponseOptionSchema>;
export type MultipleResponseQuestion = z.infer<typeof multipleResponseSchema>;
