import { QuestionPlugin } from "../../core/types";
import { QuestionType } from "@/features/sets/set-service";
import { HotspotsEditor } from "./hotspots.editor";
import { HotspotsPlayer } from "./hotspots.player";
import { hotspotsSchema } from "./hotspots.schema";
import { HotspotsViewer } from "./hotspots.viewer";
import { HotspotsQuestion } from "@/features/sets/set-service";

export const hotspotsPlugin: QuestionPlugin<HotspotsQuestion> = {
  type: QuestionType.HOTSPOTS,
  schema: hotspotsSchema,
  Editor: HotspotsEditor,
  Viewer: HotspotsViewer,
  Player: HotspotsPlayer,
  default: {
    type: QuestionType.HOTSPOTS,
    title: "Click on the correct area in the image",
    points: 10,
    timeLimit: 30,
    imageUrl: "",
    hotspots: [],
  },
};

export * from "./hotspots.editor";
export * from "./hotspots.player";
export * from "./hotspots.schema";
export * from "./hotspots.viewer";
