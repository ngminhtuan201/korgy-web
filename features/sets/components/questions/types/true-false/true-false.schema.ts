import { QuestionType } from "@/features/sets/set-service";
import { z } from "zod";

export const trueFalseSchema = z.object({
  type: z.literal(QuestionType.TRUE_FALSE),
  title: z.string(),
  imageUrl: z.string().optional(),
  audioUrl: z.string().optional(),
  answer: z.boolean(),
  trueOption: z.object({
    title: z.string(),
    imageUrl: z.string().optional(),
    audioUrl: z.string().optional(),
  }),
  falseOption: z.object({
    title: z.string(),
    imageUrl: z.string().optional(),
    audioUrl: z.string().optional(),
  }),
  explanation: z
    .object({
      text: z.string(),
      imageUrl: z.string().optional(),
      audioUrl: z.string().optional(),
      duration: z.number().optional(),
    })
    .optional(),
  points: z.number(),
  timeLimit: z.number(),
});

export type TrueFalseQuestion = z.infer<typeof trueFalseSchema>;
