import { QuestionType } from "@/features/sets/set-service";
import { QuestionPlugin } from "../../core/types";
import { MultipleResponseEditor } from "./multiple-response.editor";
import { MultipleResponsePlayer } from "./multiple-response.player";
import {
  MultipleResponseQuestion,
  multipleResponseSchema,
} from "./multiple-response.schema";
import { MultipleResponseViewer } from "./multiple-response.viewer";

export const multipleResponsePlugin: QuestionPlugin<MultipleResponseQuestion> =
  {
    type: QuestionType.MULTIPLE_RESPONSE,
    schema: multipleResponseSchema,
    Editor: MultipleResponseEditor,
    Viewer: MultipleResponseViewer,
    Player: MultipleResponsePlayer,
    default: {
      type: QuestionType.MULTIPLE_RESPONSE,
      title: "Select all correct answers",
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

export * from "./multiple-response.editor";
export * from "./multiple-response.player";
export * from "./multiple-response.schema";
export * from "./multiple-response.viewer";
