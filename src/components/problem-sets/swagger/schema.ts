export const problemSetSchema = {
  ProblemSet: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Name of the problem set",
      },
      tags: {
        type: "array",
        items: {
          type: "string",
        },
        description: "Tags associated with the problem set",
      },
      difficulty: {
        type: "string",
        enum: ["Easy", "Medium", "Hard"],
        description: "Difficulty level",
      },
      status: {
        type: "boolean",
        description: "Problem set completion status",
      },
      practiceLink: {
        type: "string",
        description: "Practice link for the problem set",
      },
    },
  },
};
