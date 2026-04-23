import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import GradientHeader from "@/components/ui/gradient-header";
import AdminFeedbackTable from "@/components/ui/admin-feedback-table";

export default async function AdminPage() {
 const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await prisma.user.findUnique({
    where: { clerrUserId: userId },
  });


  const posts = await prisma.post.findMany({
    include: {
      author: true,
      votes: true,
    },
    orderBy: {
      cretedAt: "desc",
    },
  });


    return (
    <div className="container mx-auto">
      <GradientHeader
        title="Admin Dashboard"
        subtitle="Manage feedbacks and update their status"
      />
    <AdminFeedbackTable posts={posts}/>
    </div>
  );
}