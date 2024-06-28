import NextAuth, { type User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";

import {
  LoginRequest,
  VerifyRequest,
  RefreshTokenRequest,
  GetUserRequest,
} from "@/config/axios_auth";

interface CustomUser extends User {
  id: string;
  accessToken: string;
  refreshToken: string;
}

const Auth = async (credentials: any) => {
  try {
    // Realiza una solicitud de inicio de sesión con las credenciales proporcionadas
    const res = await LoginRequest(credentials.username, credentials.password);
    const cookieStore = cookies();
    // Verifica la respuesta de la solicitud de inicio de sesión

    if (res.status === 200) {
      // Si la solicitud de inicio de sesión es exitosa, realiza la verificación
      const verify = await VerifyRequest(credentials.username, res.data.access);

      // Verifica la respuesta de la solicitud de verificación
      if (verify.status === 200) {
        // Si la verificación es exitosa, obtén los datos del usuario
        const user = await GetUserRequest(res.data.access, verify.data.user_id);

        cookieStore.delete("permissions");
        cookieStore.set("permissions", verify.data.user_permissions, {
          maxAge: 60 * 60 * 24 * 30,
        });

        // Verifica la respuesta de la solicitud de datos del usuario
        if (user.status === 200) {
          // Si todas las solicitudes son exitosas, devuelve los datos del usuario
          return {
            name: user.data.username,
            email: user.data.email,
            image: user.data.avatar,
            picture: user.data.avatar,
            id: user.data.id,
            accessToken: res.data.access,
            refreshToken: res.data.refresh,
          } as CustomUser;
        } else {
          // Si la solicitud de datos del usuario falla, lanza un error con el mensaje de error
          return new Error(user.data);
        }
      } else {
        // Si la verificación falla, lanza un error con el mensaje de error de verificación
        return new Error(verify.data);
      }
    } else if (res.status === 401) {
      // Si la solicitud de inicio de sesión devuelve un código de estado 401, retorna null
      return null;
    } else {
      // Si la solicitud de inicio de sesión falla, lanza un error con el mensaje de error
      return null;
    }
  } catch (error) {
    // Captura cualquier error que pueda ocurrir durante el proceso y maneja el error adecuadamente
    // Puedes agregar aquí la lógica para manejar el error de manera específica
    return null;
  }
};

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const user = await Auth(credentials);

        if (user) {
          return user;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      try {
        const authResposnse = await Auth(credentials);

        account.access_token = authResposnse.accessToken;
        account.refresh_token = authResposnse.refreshToken;

        return authResposnse as CustomUser;
      } catch (e) {
        throw e;
      }
    },
    async jwt({ token, account, user }) {
      if (account) {
        const accessToken = await RefreshTokenRequest(
          account.refresh_token,
          user.name,
        );

        token.refreshToken = account.access_token;
        token.accessToken = accessToken.data.refresh;
      }

      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      if (token) {
        session.user = token;
      }

      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
});

export { handler as GET, handler as POST };
