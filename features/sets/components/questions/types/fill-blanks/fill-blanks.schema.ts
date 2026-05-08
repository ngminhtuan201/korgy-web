import { QuestionType } from "@/features/sets/set-service";
import { z } from "zod";

export const fillBlanksPartSchema = z.object({
  type: z.enum(["text", "blank"]),
  content: z.string(),
  extraCorrectAnswers: z.array(z.string()).optional(),
});

export const fillBlanksSchema = z.object({
  type: z.literal(QuestionType.FILL_BLANKS),
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
  parts: z.array(fillBlanksPartSchema).min(1),
});

export type FillBlanksPart = z.infer<typeof fillBlanksPartSchema>;
export type FillBlanksQuestion = z.infer<typeof fillBlanksSchema>;
