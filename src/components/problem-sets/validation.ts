import Joi from "joi";
import { objectIdValidator } from "../../utils/common-function";
import { IProblemSetSchema } from "./interface";

class ProblemSetValidation {
  public validateId(id: string): Joi.ValidationResult {
    return Joi.string()
      .custom(objectIdValidator, "MongoDB ObjectID")
      .validate(id, { messages: { "string.custom": "Invalid ID format" } });
  }

  public validateCreateBody(data: IProblemSetSchema): Joi.ValidationResult {
    const schema = Joi.object({
      name: Joi.string().required(),
      tags: Joi.array().items(Joi.string()),
      difficulty: Joi.string().valid("Easy", "Medium", "Hard").required(),
      status: Joi.boolean().required(),
      practiceLink: Joi.string().uri(),
      isLeetCode: Joi.boolean().required(),
      youtubeLink: Joi.string().uri(),
      userId: Joi.string()
        .custom(objectIdValidator, "MongoDB ObjectID")
        .required(),
    });

    return schema.validate(data);
  }
}

export default new ProblemSetValidation();
