import config from "@config/config";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@prisma";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials, req) => {
        const adminUser = {
          username: config.ADMIN_USERNAME,
          password: config.ADMIN_PASSWORD,
        };

        let dbAdminUser = await prisma.user.findUnique({
          where: {
            name: adminUser.username,
          },
        });

        if (!dbAdminUser) {
          const salt = await bcrypt.genSalt();
          const hashedPassword = await bcrypt.hash(adminUser.password, salt);
          dbAdminUser = await prisma.user.create({
            data: {
              name: adminUser.username,
              password: hashedPassword,
            },
          });
        }

        if (
          credentials?.username === adminUser.username &&
          (await bcrypt.compare(credentials.password, dbAdminUser.password))
        ) {
          return {
            id: dbAdminUser.id,
            name: dbAdminUser.name,
            email: dbAdminUser.email,
          };
        } else {
          throw new Error("Wrong credentials. Try again.");
        }
      },
    }),
  ],
  pages: {
    signIn: "/secret-sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET!,
};

export default NextAuth(authOptions);
