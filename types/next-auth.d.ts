// types/next-auth.d.ts

import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

// Estende o tipo do token JWT para incluir o 'id'
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
  }
}

// Estende o tipo da Sessão para incluir o 'id' no objeto 'user'
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
    } & DefaultSession["user"]; // Mantém as propriedades originais (name, email, image)
  }
}
