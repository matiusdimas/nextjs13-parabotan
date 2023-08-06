import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Adapter } from "next-auth/adapters";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export const authOptions: AuthOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID as string,
            clientSecret: process.env.GITHUB_SECRET as string,
        }),
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) throw new Error("Invalid Input");

                const user = await prisma.user.findUnique({
                    where: {
                        name: credentials!.username
                    }
                })

                if (!user) throw new Error("Username Not Found");

                const checkPassword = await bcrypt.compare(credentials!.password, user.password! || '')

                if (!checkPassword) throw new Error("Wrong Password");

                return user
            }
        }),
    ],
    cookies: {
        sessionToken: {
            name: 'token',
            options: {
                httpOnly: true,
                sameSite: 'lax',
                path: '/',
                secure: true
            }
        }
    },
    pages: {
        signIn: '/login',
    },
    callbacks: {
        async jwt({ token, user }) {
            return { ...token, ...user }
        },
        async session({ session, token, user }) {
            session.user = token
            return session
        }
    },
    secret: process.env.SECRET,
    session: {
        strategy: 'jwt',
    }
};

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }