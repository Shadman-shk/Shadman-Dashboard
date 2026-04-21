import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import GradientHeader from "@/components/ui/gradient-header";
import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";
import { ArrowRight, Map, PlusIcon } from "lucide-react";
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from "@/components/ui/card";
import { getCategoryDesign } from "@/app/data/category-data";
import { Badge } from "@/components/ui/badge";
import FeedbackList from "@/components/ui/feedback-list";

export default async function FeedbackPage() {
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
                            <Link href="/roadmap">
                                <Map className=" ml-2 h-4 w-4" />
                                View Roadmap </Link>
                        </Button>
                    </div>
                </GradientHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Categories</CardTitle>
                                <CardDescription>
                                    Browse feedback by category
                                </CardDescription>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    {categories.map((cat) => {
                                        const design = getCategoryDesign(cat.category);
                                        const Icon = design.icon;

                                        return (
                                            <div
                                                key={cat.category}
                                                className="group flex items-center justify-between p-3 rounded"
                                            >
                                                <div className="flex items-center gap-2">
                                                    <div className={`p-2 rounded-lg ${design.light} ${design.border} border`}>
                                                        <Icon className={`h-4 w-4 ${design.text}`}/>
                                                        <span className="font-medium text-sm">{cat.category}</span>
                                                    </div>
                                                    <Badge variant="secondary" className={`${design.light} ${design.text}`}>{cat._count}</Badge>
                                                   </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                    <div className="lg:col-span-3">
                        <FeedbackList initialPosts={posts} userId={userId} />
                    </div>
                </div>

            </div>
        </>
    );
}