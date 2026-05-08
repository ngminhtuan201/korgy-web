import { QuestionType } from "@/features/sets/set-service";
import { z } from "zod";

export const hotspotSchema = z.object({
  x: z.number(),
  y: z.number(),
});

export const hotspotsSchema = z.object({
  type: z.literal(QuestionType.HOTSPOTS),
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
  imageUrl: z.string().min(1, "Image is required for hotspots question"),
  hotspots: z.array(hotspotSchema).min(1, "At least one hotspot is required"),
});

export type Hotspot = z.infer<typeof hotspotSchema>;
export type HotspotsQuestion = z.infer<typeof hotspotsSchema>;
