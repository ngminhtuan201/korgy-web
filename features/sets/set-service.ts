import { api } from "@/lib/http";

export enum QuestionType {
  TRUE_FALSE = "true_false",
  MULTIPLE_CHOICE = "multiple_choice",
  MULTIPLE_RESPONSE = "multiple_response",
  MATCHING = "matching",
  ORDERING = "ordering",
  FILL_BLANKS = "fill_blanks",
  HOTSPOTS = "hotspots",
  CATEGORIZE = "categorize",
  TEXT_INPUT = "text_input",
}

export interface Explanation {
  text?: string;
  duration?: number;
  imageUrl?: string;
  audioUrl?: string;
}

export interface BaseQuestion {
  type: QuestionType;
  title: string;
  /**
   * Time limit in seconds.
   * If not set, it will be unlimited.
   */
  timeLimit?: number;
  points: number;
  explanation?: Explanation;
}

export interface MultipleChoiceOption {
  text: string;
  imageUrl?: string;
  audioUrl?: string;
  isCorrect: boolean;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: QuestionType.MULTIPLE_CHOICE;
  options: MultipleChoiceOption[];
  imageUrl?: string;
  audioUrl?: string;
}

export interface MultipleResponseQuestion extends BaseQuestion {
  type: QuestionType.MULTIPLE_RESPONSE;
  options: MultipleChoiceOption[];
  imageUrl?: string;
  audioUrl?: string;
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: QuestionType.TRUE_FALSE;
  trueOption: {
    title?: string;
    imageUrl?: string;
    audioUrl?: string;
  };
  falseOption: {
    title?: string;
    imageUrl?: string;
    audioUrl?: string;
  };
  imageUrl?: string;
  audioUrl?: string;
}

export interface MatchingItem {
  text?: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface MatchingQuestion extends BaseQuestion {
  type: QuestionType.MATCHING;
  pairs: { left: MatchingItem; right: MatchingItem }[];
}

export interface OrderingItem {
  text: string;
  imageUrl?: string;
}

export interface OrderingQuestion extends BaseQuestion {
  type: QuestionType.ORDERING;
  items: OrderingItem[];
}

export interface HotspotsQuestion extends BaseQuestion {
  type: QuestionType.HOTSPOTS;
  imageUrl: string;
  hotspots: {
    x: number;
    y: number;
  }[];
}

export interface CategorizeItem {
  text?: string;
  imageUrl?: string;
  audioUrl?: string;
}

export interface CategorizeCategory {
  title: string;
  imageUrl?: string;
  audioUrl?: string;
  items: CategorizeItem[];
}

export interface CategorizeQuestion extends BaseQuestion {
  type: QuestionType.CATEGORIZE;
  categories: CategorizeCategory[];
}

export interface TextInputQuestion extends BaseQuestion {
  type: QuestionType.TEXT_INPUT;
  correctAnswers: string[];
  imageUrl?: string;
}

export interface FillBlanksQuestion extends BaseQuestion {
  type: QuestionType.FILL_BLANKS;
  parts: {
    type: "text" | "blank";
    content: string;
    extraCorrectAnswers?: string[];
  }[];
}

export type Question =
  | MultipleChoiceQuestion
  | MultipleResponseQuestion
  | TrueFalseQuestion
  | MatchingQuestion
  | OrderingQuestion
  | HotspotsQuestion
  | CategorizeQuestion
  | TextInputQuestion
  | FillBlanksQuestion;

export interface Set {
  id: string;
  userId: string;
  name: string;
  description?: string;
  isPublic: boolean;
  thumbnailUrl?: string;
  questions: Question[];
  createdAt: string;
  updatedAt: string;
  isFavorite: boolean;
}

export interface CreateSetDto {
  name: string;
  description?: string;
  isPublic: boolean;
  thumbnailUrl?: string;
}

export interface UpdateSetDto {
  name?: string;
  description?: string;
  isPublic?: boolean;
  thumbnailUrl?: string;
}

export const setService = {
  getSets: async () => {
    const response = await api.get<{ sets: Set[] }>("/sets");
    return response.sets;
  },

  getSet: async (id: string) => {
    const response = await api.get<{ set: Set }>(`/sets/${id}`);
    return response.set;
  },

  createSet: async (dto: CreateSetDto) => {
    const response = await api.post<{ newSet: Set }>("/sets", dto);
    return response.newSet;
  },

  updateSet: async (id: string, dto: UpdateSetDto) => {
    const response = await api.put<{ updatedSet: Set }>(`/sets/${id}`, dto);
    return response.updatedSet;
  },

  deleteSet: async (id: string): Promise<void> => {
    await api.delete(`/sets/${id}`);
  },
};
