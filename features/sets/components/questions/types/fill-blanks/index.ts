import { QuestionPlugin } from "../../core/types";
import { QuestionType } from "@/features/sets/set-service";
import { FillBlanksEditor } from "./fill-blanks.editor";
import { FillBlanksPlayer } from "./fill-blanks.player";
import { fillBlanksSchema } from "./fill-blanks.schema";
import { FillBlanksViewer } from "./fill-blanks.viewer";
import { FillBlanksQuestion } from "@/features/sets/set-service";

export const fillBlanksPlugin: QuestionPlugin<FillBlanksQuestion> = {
  type: QuestionType.FILL_BLANKS,
  schema: fillBlanksSchema,
  Editor: FillBlanksEditor,
  Viewer: FillBlanksViewer,
  Player: FillBlanksPlayer,
  default: {
    type: QuestionType.FILL_BLANKS,
    title: "Fill in the blanks",
    points: 10,
    timeLimit: 30,
    parts: [
      { type: "text", content: "The " },
      { type: "blank", content: "quick" },
      { type: "text", content: " brown fox." },
    ],
  },
};

export * from "./fill-blanks.editor";
export * from "./fill-blanks.player";
export * from "./fill-blanks.schema";
export * from "./fill-blanks.viewer";
