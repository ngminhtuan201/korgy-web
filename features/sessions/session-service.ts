import { api } from "@/lib/http";
import { Set, Question } from "../sets/set-service";

export enum SessionStatus {
  WAITING = "waiting",
  ACTIVE = "active",
  FINISHED = "finished",
}

export enum SessionEndCondition {
  TIME = "time",
  GOAL = "goal",
}

export enum SessionGame {
  QUIZ = "quiz",
  WHACK_A_BUG = "whack-a-bug", // Đập gián
  CHICKEN_TOSS = "chicken-toss", // Ném gà
}

export enum SessionPlayMode {
  SOLO = "solo",
  TEAM = "team",
}

export type SetSnapshot = Pick<
  Set,
  "id" | "name" | "thumbnailUrl" | "questions"
>;

export interface Session {
  id: string;
  userId: string;
  set: SetSnapshot;
  game: SessionGame;
  joinCode: string;
  status: SessionStatus;
  shuffleQuestions: boolean;
  endCondition: SessionEndCondition;
  duration: number;
  loginRequired: boolean;
  allowLateJoining: boolean;
  playMode: SessionPlayMode;
  startedAt?: string;
  endedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Player {
  id: string;
  sessionId: string;
  nickname: string;
  userId?: string;
  score: number;
  correctCount: number;
  totalAnswered: number;
  joinedAt: string;
  isActive: boolean;
  clientId: string;
}

export interface CreateSessionDto {
  setId: string;
  game: SessionGame;
  shuffleQuestions?: boolean;
  endCondition?: SessionEndCondition;
  duration?: number;
  loginRequired: boolean;
  allowLateJoining: boolean;
  playMode: SessionPlayMode;
}

export interface JoinSessionDto {
  nickname: string;
}

export interface AnswerQuestionDto {
  questionId: string;
  answerData: unknown;
}

export interface LeaderboardEntry {
  rank: number;
  playerId: string;
  nickname: string;
  score: number;
  correctCount: number;
  totalAnswered: number;
  accuracy: number;
}

export interface QuestionResult {
  questionId: string;
  title: string;
  type: string;
  points: number;
  playerAnswers: Array<{
    playerId: string;
    nickname: string;
    answerData: unknown;
    isCorrect: boolean;
    points: number;
    timeSpent: number;
  }>;
}

export interface SessionResults {
  sessionId: string;
  setName: string;
  totalQuestions: number;
  players: LeaderboardEntry[];
  questionResults: QuestionResult[];
}

export interface PaginationMetadata {
  totalItems: number;
  totalPages: number;
  pageSize: number;
  pageNumber: number;
}

export interface PaginatedSessions {
  items: Session[];
  metadata: PaginationMetadata;
}

export const sessionService = {
  createSession: async (dto: CreateSessionDto) => {
    const response = await api.post<{ newSession: Session }>("/sessions", dto);
    return response.newSession;
  },

  getSessions: async (params?: {
    pageNumber?: number;
    pageSize?: number;
    sortField?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    const response = await api.get<{ paginatedSessions: PaginatedSessions }>(
      "/sessions",
      { params },
    );
    return response.paginatedSessions;
  },

  getSession: async (id: string) => {
    const response = await api.get<{ session: Session }>(`/sessions/${id}`);
    return response.session;
  },

  getSessionByCode: async (code: string) => {
    const response = await api.get<{ session: Session }>(
      `/sessions/join/${code}`,
    );
    return response.session;
  },

  joinSession: async (id: string, dto: JoinSessionDto) => {
    const response = await api.post<{ player: Player }>(
      `/sessions/${id}/join`,
      dto,
    );
    return response.player;
  },

  startSession: async (id: string) => {
    const response = await api.post<{ session: Session }>(
      `/sessions/${id}/start`,
    );
    return response.session;
  },

  nextQuestion: async (id: string) => {
    const response = await api.post<{ session: Session }>(
      `/sessions/${id}/next-question`,
    );
    return response.session;
  },

  submitAnswer: async (
    id: string,
    payload: AnswerQuestionDto & { playerId: string },
  ) => {
    const response = await api.post<{ answer: any }>(
      `/sessions/${id}/answer`,
      payload,
    );
    return response.answer;
  },

  endSession: async (id: string) => {
    const response = await api.post<{ session: Session }>(
      `/sessions/${id}/end`,
    );
    return response.session;
  },

  getLeaderboard: async (id: string) => {
    const response = await api.get<{ leaderboard: LeaderboardEntry[] }>(
      `/sessions/${id}/leaderboard`,
    );
    return response.leaderboard;
  },

  getResults: async (id: string) => {
    const response = await api.get<{ results: SessionResults }>(
      `/sessions/${id}/results`,
    );
    return response.results;
  },
};
