import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import GradientHeader from "@/components/ui/gradient-header";   
import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";
import { ArrowRight,Map, PlusIcon } from "lucide-react";


export default async function NewFeedbackPage() {
  // Get the userId from clerk auth
  const { userId } = await auth();

  const posts = await prisma.post.findMany({
    include: {
      author: true,
      votes: true,
    },
    orderBy: {
      cretedAt: "desc",
    },
  });

  const categories = await prisma.post.groupBy({
    by: ["category"],
    _count: true,
  });

  return (
  <>
    <div className="space-y-6">
      <GradientHeader
        title="Community Feedback"
        subtitle="Explore, vote, and contribute to the features that matter most. Yo"
      >
        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-grey-100">
            <Link href="/feedback/new">
            <PlusIcon className="ml-2 h-4 w-4" />
            New Feedback 
            </Link>
          </Button>
          <Button size="lg" className="bg-white text-black hover:bg-grey-100">
            <Link href="/roadmap">View Roadmap <Map className=" ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </GradientHeader>
    </div>
  </>
);
}