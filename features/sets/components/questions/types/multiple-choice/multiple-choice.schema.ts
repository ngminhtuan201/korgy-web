import { QuestionType } from "@/features/sets/set-service";
import { z } from "zod";

export const multipleChoiceOptionSchema = z.object({
  text: z.string(),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  isCorrect: z.boolean(),
});

export const multipleChoiceSchema = z.object({
  type: z.literal(QuestionType.MULTIPLE_CHOICE),
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
  options: z.array(multipleChoiceOptionSchema).min(2),
});

export type MultipleChoiceOption = z.infer<typeof multipleChoiceOptionSchema>;
export type MultipleChoiceQuestion = z.infer<typeof multipleChoiceSchema>;
