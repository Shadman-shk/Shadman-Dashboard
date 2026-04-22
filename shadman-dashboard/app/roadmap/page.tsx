import prisma from "@/lib/prisma";
import GradientHeader from "@/components/ui/gradient-header";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Target, BarChart2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

function getStatusPercentage(posts: any, status: string) {
    const total = posts.length;
    const count = posts.filter((p: { status: string; }) => p.status === status);
    return total > 0 ? Math.round(count / total * 100) : 0;
}
export default async function RoadmapPage() {

    const posts = await prisma.post.findMany({
        include: {
            author: true,
            votes: true,
        },
        orderBy: {
            votes: {
                _count: "desc"
            },
        },
    });

    const groupedPosts = {
        under_review: posts.filter((p) => p.status === "under_review"),
        planned: posts.filter((p) => p.status === "planned"),
        in_progress: posts.filter((p) => p.status === "in_progress"),
        completed: posts.filter((p) => p.status === "completed"),
    }

    const totalVotes = posts.reduce((acc, post) => acc + post.votes.length, 0);
    const averageVotes = posts.length > 0 ? Math.round(totalVotes / posts.length) : 0;

    //Calculate progress for the overall roadmap
    const completedPercentage = getStatusPercentage(posts, "completed");
    const inProgressPercentage = getStatusPercentage(posts, "in_progress");
    const plannedPercentage = getStatusPercentage(posts, "planned");

    return (
        <div className="space-y-8">
            <GradientHeader
                title="Product Roadmap"
                subtitle="See what we're working on, what's coming next, and track our progress"
            />

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Features</p>
                                <p className="text-3xl font-bold">{posts.length}</p>
                            </div>
                            <Target className=" h-20 w-10 text-blue-500"/>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-500">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Votes</p>
                                <p className="text-3xl font-bold">{totalVotes}</p>
                            </div>
                            <BarChart2 className=" h-20 w-10 text-purple-500"/>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-green-500">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Completed</p>
                                <p className="text-3xl font-bold">{groupedPosts.completed.length}</p>
                            </div>
                            <Target className=" h-20 w-10 text-green-500"/>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-yellow-500">
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">AverageVotes</p>
                                <p className="text-3xl font-bold">{averageVotes}</p>
                            </div>
                            <Target className=" h-20 w-10 text-yellow-500"/>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
  <CardHeader>
    <CardTitle>Roadmap Progress</CardTitle>
    <CardDescription>
      Track the journey from idea to completion
    </CardDescription>
  </CardHeader>

  <CardContent className="space-y-6">
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Overall Completion</span>
        <span className="font-medium">{completedPercentage}%</span>
      </div>
         <Progress value={completedPercentage} className="h-2"/>
         <div className="grid grid-col-3 gap-4">
            <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {inProgressPercentage}%
                </div>
                <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
                <div className="text-2xl font-bold text-bluee-600 dark:text-blue-400">
                    {plannedPercentage}%
                </div>
                <div className="text-sm text-muted-foreground">In Progress</div>
            </div>
         </div>
         <div className="text-center">
                <div className="text-2xl font-bold text-green-600 ark:text-green-400">
                    {completedPercentage}%
                </div>
                <div className="text-sm text-muted-foreground">In Progress</div>
        </div>
    </div>
  </CardContent>
</Card>
        </div>
    );
}