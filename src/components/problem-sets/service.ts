import { ErrorHandler } from "../../utils/common-function";
import ProblemSetDAO from "./dao";
import { IGetAllBody, IProblemSetSchema } from "./interface";
import ProblemSetValidation from "./validation";

class ProblemSetService {
  public async getAll(body: IGetAllBody): Promise<IProblemSetSchema[]> {
    try {
      const { error } = ProblemSetValidation.validateId(body.userId);

      if (error) {
        throw new ErrorHandler({ statusCode: 400, message: error.message });
      }

      const data = await ProblemSetDAO.getAllProblemSets(body.userId);

      if (!data || data.length < 0) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Data not found.",
        });
      }

      return data;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  }

  public async create(data: IProblemSetSchema): Promise<IProblemSetSchema> {
    try {
      const { error } = ProblemSetValidation.validateCreateBody(data);

      if (error) {
        throw new ErrorHandler({ statusCode: 400, message: error.message });
      }

      return await ProblemSetDAO.createProblemSet(data);
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  }

  public async update(
    id: string,
    data: Partial<IProblemSetSchema>
  ): Promise<IProblemSetSchema | null> {
    try {
      const { error } = ProblemSetValidation.validateId(id);
      if (error) {
        throw new ErrorHandler({ statusCode: 400, message: error.message });
      }

      const updatedData = await ProblemSetDAO.updateProblemSet(id, data);

      if (!updatedData) {
        throw new ErrorHandler({
          statusCode: 404,
          message: "Problem set not found.",
        });
      }

      return updatedData;
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const { error } = ProblemSetValidation.validateId(id);
      if (error) {
        throw new ErrorHandler({ statusCode: 400, message: error.message });
      }

      await ProblemSetDAO.deleteProblemSet(id);
    } catch (error: any) {
      throw new ErrorHandler({ statusCode: 400, message: error.message });
    }
  }
}

export default new ProblemSetService();
