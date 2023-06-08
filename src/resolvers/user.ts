import { CreateUsernameResponse, GraphqlContext } from "../utils/types";

const resolvers = {
  Query: {
    searchUsers: () => {},
  },
  Mutation: {
    createUsername: async (
      _: any,
      args: { username: string },
      context: GraphqlContext
    ): Promise<CreateUsernameResponse> => {
      const { prisma, session } = context;

      if (!session) {
        return {
          error: "Unauthorized user",
        };
      }

      const userId = session.user?.id;

      try {
        /**
         * check username available
         */
        const existingUser = await prisma.user.findUnique({
          where: {
            username: args.username,
          },
        });

        if (existingUser) {
          return {
            error: "username already taken",
          };
        }

        /**
         * update user
         */

        await prisma.user.update({
          where: {
            id: userId,
          },
          data: {
            username: args.username,
          },
        });

        return { success: true };
      } catch (error) {
        console.log(error);
        return {
          error: "failed to create username",
        };
      }
    },

    createUser: async (
      _: any,
      args: { email: string; name: string; password: string },
      context: GraphqlContext
    ) => {
      try {
        /**
         * check if email exists
         */

        const emailExists = await context.prisma.user.findUnique({
          where: {
            email: args.email,
          },
        });

        if (emailExists) {
          return {
            error: "Email already exists",
          };
        }

        await context.prisma.user.create({
          data: {
            name: args.name,
            email: args.email,
            password: args.password,
          },
        });

        return { success: true };
      } catch (error) {
        console.log(error);
      }
    },
  },
};

export default resolvers;
