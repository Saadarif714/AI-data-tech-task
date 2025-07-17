import { getServerSession, Session } from "next-auth";
import authOptions from "@/pages/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import TodoSection from "./TodoSection";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions) as Session
  if (!session) {
    redirect("/login");
  }

  const useremail = session.user?.email!;
  const username = session.user?.name;

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-4">
        Welcome, {username}
      </h1>
      <TodoSection userEmail={useremail} />
    </div>
  );
}
