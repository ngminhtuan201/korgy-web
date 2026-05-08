import { QuestionType } from "@/features/sets/set-service";
import { z } from "zod";

export const textInputSchema = z.object({
  type: z.literal(QuestionType.TEXT_INPUT),
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
  imageUrl: z.string().optional(),
  correctAnswers: z.array(z.string()).min(1, "At least one correct answer is required"),
});

export type TextInputQuestion = z.infer<typeof textInputSchema>;
