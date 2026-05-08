import { QuestionType } from "@/features/sets/set-service";
import { QuestionPlugin } from "../../core/types";
import { MultipleChoiceEditor } from "./multiple-choice.editor";
import { MultipleChoicePlayer } from "./multiple-choice.player";
import {
  MultipleChoiceQuestion,
  multipleChoiceSchema,
} from "./multiple-choice.schema";
import { MultipleChoiceViewer } from "./multiple-choice.viewer";

export const multipleChoicePlugin: QuestionPlugin<MultipleChoiceQuestion> = {
  type: QuestionType.MULTIPLE_CHOICE,
  schema: multipleChoiceSchema,
  Editor: MultipleChoiceEditor,
  Viewer: MultipleChoiceViewer,
  Player: MultipleChoicePlayer,
  default: {
    type: QuestionType.MULTIPLE_CHOICE,
    title: "Select the correct answer",
    points: 10,
    timeLimit: 30,
    options: [
      {
        text: "Option A",
        isCorrect: false,
      },
      {
        text: "Option B",
        isCorrect: false,
      },
      {
        text: "Option C",
        isCorrect: false,
      },
      {
        text: "Option D",
        isCorrect: false,
      },
    ],
  },
};

export * from "./multiple-choice.editor";
export * from "./multiple-choice.player";
export * from "./multiple-choice.schema";
export * from "./multiple-choice.viewer";
