import { QuestionType } from "@/features/sets/set-service";
import { QuestionPlugin } from "../../core/types";
import { MatchingEditor } from "./matching.editor";
import { MatchingPlayer } from "./matching.player";
import { MatchingQuestion, matchingSchema } from "./matching.schema";
import { MatchingViewer } from "./matching.viewer";

export const matchingPlugin: QuestionPlugin<MatchingQuestion> = {
  type: QuestionType.MATCHING,
  schema: matchingSchema,
  Editor: MatchingEditor,
  Viewer: MatchingViewer,
  Player: MatchingPlayer,
  default: {
    type: QuestionType.MATCHING,
    title: "Match the left items to the right items",
    points: 10,
    timeLimit: 30,
    pairs: [
      { left: { text: "Term 1" }, right: { text: "Definition 1" } },
      { left: { text: "Term 2" }, right: { text: "Definition 2" } },
      { left: { text: "Term 3" }, right: { text: "Definition 3" } },
    ],
  },
};

export * from "./matching.editor";
export * from "./matching.player";
export * from "./matching.schema";
export * from "./matching.viewer";
