import { PrismaClient } from "@prisma/client";
import { ISODateString } from "next-auth";
// import { Session } from "next-auth";
/**
 *Context type
 *
 */
export interface GraphqlContext {
  prisma: PrismaClient;
  session: Session | null;
}

/**
 * User type
 */

export interface CreateUsernameResponse {
  success?: boolean;
  error?: string;
}

export interface Session {
  user?: User;
  expires: ISODateString;
}

export interface User {
  username: string;
  id: string;
  email: string;
  name: string;
  image: string;
}
