import ProblemSetSchema from "./model";
import { ErrorHandler } from "../../utils/common-function";
import { IProblemSetSchema } from "./interface";

class ProblemSetDAO {
  public async getAllProblemSets(
    userId: string
  ): Promise<IProblemSetSchema[] | null> {
    try {
      const data = await ProblemSetSchema.find({
        userId,
      });

      return data;
    } catch (error) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public async createProblemSet(
    data: IProblemSetSchema
  ): Promise<IProblemSetSchema> {
    try {
      return await ProblemSetSchema.create(data);
    } catch (error) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public async updateProblemSet(
    id: string,
    data: Partial<IProblemSetSchema>
  ): Promise<IProblemSetSchema | null> {
    try {
      return await ProblemSetSchema.findByIdAndUpdate(id, data, {
        new: true,
      });
    } catch (error) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }

  public async deleteProblemSet(id: string): Promise<void> {
    try {
      await ProblemSetSchema.findByIdAndDelete(id);
    } catch (error) {
      throw new ErrorHandler({ statusCode: 500, message: "Database Error" });
    }
  }
}

export default new ProblemSetDAO();
