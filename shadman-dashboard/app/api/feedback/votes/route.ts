
import prisma from "@/lib/prisma";
import { syncCurrenUser } from "@/lib/sync-user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const dbuser = await syncCurrenUser();
        if(!dbuser) {
            return NextResponse.json({error:"Unauthorised"}, {status: 401});
        }
        const {postId} = await request.json();
        if(!postId) {
            return NextResponse.json({error:"postId is required"}, {status: 400});
        }
        //Check if vote already exists
        const existingVote = await prisma.vote.findUnique({
            where: {
                userId_postId: {
                    userId: dbuser.id,
                    postId: postId,
                },
            },
        });
        if(existingVote) {
            //Remove Vote
            await prisma.vote.delete({
                where: {
                    id: existingVote.id,    
                },  
            });
            return NextResponse.json({voted: false});
        }else{
            await prisma.vote.create({
                data: {
                    userId: dbuser.id,
                    postId: postId,
                },
            });
            return NextResponse.json({voted: true});
        }
    } catch (error) {
        console.error("Error processing vote:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
