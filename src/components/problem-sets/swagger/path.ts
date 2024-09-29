export const problemSetPath = {
  "/problem-set": {
    get: {
      description: "Get all problem sets",
      tags: ["problem-set"],
      operationId: "getAllProblemSets",
      responses: {
        200: {
          description: "A list of problem sets",
          content: {
            "application/json": {
              schema: {
                type: "array",
                items: {
                  $ref: "#/components/schemas/ProblemSet",
                },
              },
            },
          },
        },
      },
    },
  },
};
