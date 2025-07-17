import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import pool from "../../../lib/db";
import bcrypt from "bcryptjs";

export default NextAuth({
  session: {
    strategy: "jwt", // uses JWT-based sessions
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        const connection = await pool.getConnection();
        try {
          const [users] = await connection.query(
            "SELECT * FROM users WHERE useremail = ?",
            [email]
          );

          if (users.length === 0) return null;

          const user = users[0];
          const isMatch = await bcrypt.compare(password, user.userpassword);

          if (!isMatch) return null;

          return {
            id: user.id,
            name: user.username,
            email: user.useremail,
          };
        } catch (err) {
          console.error("Auth error:", err);
          return null;
        } finally {
          connection.release();
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.name;
        token.useremail = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.useremail = token.useremail;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // optional, links to your styled login page
  },
  secret: process.env.NEXTAUTH_SECRET || "somesecretkey",
});
export { handler as GET, handler as POST };