import { QuestionPlugin } from "../../core/types";
import { QuestionType } from "@/features/sets/set-service";
import { CategorizeEditor } from "./categorize.editor";
import { CategorizePlayer } from "./categorize.player";
import { categorizeSchema } from "./categorize.schema";
import { CategorizeViewer } from "./categorize.viewer";
import { CategorizeQuestion } from "@/features/sets/set-service";

export const categorizePlugin: QuestionPlugin<CategorizeQuestion> = {
  type: QuestionType.CATEGORIZE,
  schema: categorizeSchema,
  Editor: CategorizeEditor,
  Viewer: CategorizeViewer,
  Player: CategorizePlayer,
  default: {
    type: QuestionType.CATEGORIZE,
    title: "Drag and drop the items into the correct categories",
    points: 10,
    timeLimit: 30,
    categories: [
      {
        title: "Category 1",
        items: [{ text: "Item 1.1" }, { text: "Item 1.2" }],
      },
      {
        title: "Category 2",
        items: [{ text: "Item 2.1" }, { text: "Item 2.2" }],
      },
    ],
  },
};

export * from "./categorize.editor";
export * from "./categorize.player";
export * from "./categorize.schema";
export * from "./categorize.viewer";
