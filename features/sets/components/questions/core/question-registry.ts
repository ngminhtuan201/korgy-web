import { QuestionType } from "@/features/sets/set-service";
import { categorizePlugin } from "../types/categorize";
import { fillBlanksPlugin } from "../types/fill-blanks";
import { hotspotsPlugin } from "../types/hotspots";
import { matchingPlugin } from "../types/matching";
import { multipleChoicePlugin } from "../types/multiple-choice";
import { multipleResponsePlugin } from "../types/multiple-response";
import { orderingPlugin } from "../types/ordering";
import { textInputPlugin } from "../types/text-input";
import { trueFalsePlugin } from "../types/true-false";
import { QuestionPlugin } from "./types";

export const questionRegistry: Record<string, QuestionPlugin> = {
  [QuestionType.TRUE_FALSE]: trueFalsePlugin,
  [QuestionType.MULTIPLE_CHOICE]: multipleChoicePlugin,
  [QuestionType.MULTIPLE_RESPONSE]: multipleResponsePlugin,
  [QuestionType.ORDERING]: orderingPlugin,
  [QuestionType.MATCHING]: matchingPlugin,
  [QuestionType.HOTSPOTS]: hotspotsPlugin,
  [QuestionType.FILL_BLANKS]: fillBlanksPlugin,
  [QuestionType.CATEGORIZE]: categorizePlugin,
  [QuestionType.TEXT_INPUT]: textInputPlugin,
};
