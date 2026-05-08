import { QuestionPlugin } from "../../core/types";
import { TrueFalseEditor } from "./true-false.editor";
import { TrueFalsePlayer } from "./true-false.player";
import { QuestionType } from "@/features/sets/set-service";
import { TrueFalseQuestion, trueFalseSchema } from "./true-false.schema";
import { TrueFalseViewer } from "./true-false.viewer";

export const trueFalsePlugin: QuestionPlugin<TrueFalseQuestion> = {
  type: QuestionType.TRUE_FALSE,
  Editor: TrueFalseEditor,
  Viewer: TrueFalseViewer,
  Player: TrueFalsePlayer,
  schema: trueFalseSchema,
  default: {
    type: QuestionType.TRUE_FALSE,
    title: "Enter question title here",
    points: 10,
    timeLimit: 30,
    answer: true,
    trueOption: {
      title: "TRUE",
    },
    falseOption: {
      title: "FALSE",
    },
  },
};

export * from "./true-false.editor";
export * from "./true-false.schema";
export * from "./true-false.viewer";
