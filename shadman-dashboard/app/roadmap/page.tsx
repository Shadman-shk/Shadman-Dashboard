import prisma from "@/lib/prisma";
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

        
    return <>Roadmap page</>;
}