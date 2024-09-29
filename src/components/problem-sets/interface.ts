import { Document, Types } from "mongoose";

export interface IProblemSetSchema extends Document {
  name: string;
  tags: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  status: boolean;
  practiceLink: string;
  isLeetCode: boolean;
  youtubeLink: string;
  userId: Types.ObjectId;
}

export type IGetAllBody = {
  userId: string;
};
