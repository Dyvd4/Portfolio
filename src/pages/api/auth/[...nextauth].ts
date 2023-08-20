import { prisma } from "@prisma";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [],
};

export default NextAuth(authOptions);
