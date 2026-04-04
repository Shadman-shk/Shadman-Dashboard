import { NextRequest, NextResponse } from "next/server";
import { syncCurrenUser } from "@/lib/sync-user";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
    try {
        const dbuser = await syncCurrenUser();
        if (!dbuser) {
            return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
        }
        const body = await request.json();
        const { title, description, category } = body;

        const post = await prisma.post.create({
            data: {
                title,
                description,
                category,
                authorId: dbuser.id,
            },
        });
        return NextResponse.json(post);
    }
    catch (error) {
        console.error("Error creating post:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });

    }
}

export async function GET(){
    try {
       const posts= await prisma.post.findMany({
            include:{
                author: true,
                votes: true,
       },
       orderBy: {
        cretedAt: "desc"
    }
        , 
        });
        return NextResponse.json(posts);
    }
    catch (error) {
        console.error("Error fetching posts:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}