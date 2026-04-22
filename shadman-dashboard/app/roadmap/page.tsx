import prisma from "@/lib/prisma";

function getStatusPercentage(posts: any, status: string){
    const total= posts.length;
    const count=posts.filter((p: {status: string;}) => p.status=== status);
    return total > 0? Math.round(count/total *100): 0;
}
export default async function RoadmapPage() {

    const posts = await prisma.post.findMany({
            include: {
                author: true,
                votes: true,
            },
            orderBy: {
                votes:{
                    _count: "desc"
                },
            },
        });

        const groupedPosts ={
            under_review: posts.filter((p)=> p.status === "under_review"),
            planned: posts.filter((p)=> p.status === "planned"),
            in_progress: posts.filter((p)=> p.status === "in_progress"),
            completed: posts.filter((p)=> p.status === "completed"),           
        }

        const totalVotes= posts.reduce((acc, post)=> acc + post.votes.length, 0);
        const averageVotes =posts.length > 0 ?  Math.round(totalVotes/posts.length) : 0;

        //Calculate progress for the overall roadmap
        const completedPercentage = getStatusPercentage(posts, "completed");
        const inProgressPercentage = getStatusPercentage(posts, "in_progress");
        const plannedPercentage = getStatusPercentage(posts, "planned");

    return <>Roadmap page</>;
}