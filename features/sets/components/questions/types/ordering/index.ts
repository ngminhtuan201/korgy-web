import { QuestionType } from "@/features/sets/set-service";
import { QuestionPlugin } from "../../core/types";
import { OrderingEditor } from "./ordering.editor";
import { OrderingPlayer } from "./ordering.player";
import { OrderingQuestion, orderingSchema } from "./ordering.schema";
import { OrderingViewer } from "./ordering.viewer";

export const orderingPlugin: QuestionPlugin<OrderingQuestion> = {
  type: QuestionType.ORDERING,
  schema: orderingSchema,
  Editor: OrderingEditor,
  Viewer: OrderingViewer,
  Player: OrderingPlayer,
  default: {
    type: QuestionType.ORDERING,
    title: "Drag and drop the items into the correct order",
    points: 10,
    timeLimit: 30,
    items: [
      { text: "Item 1" },
      { text: "Item 2" },
      { text: "Item 3" },
      { text: "Item 4" },
    ],
  },
};

export * from "./ordering.editor";
export * from "./ordering.player";
export * from "./ordering.schema";
export * from "./ordering.viewer";
