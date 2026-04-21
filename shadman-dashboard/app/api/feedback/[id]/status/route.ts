import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";

const STATUS_ORDER = ["PENDING", "PLANNED", "IN_PROGRESS", "COMPLETED"];

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: "Unauthorised" }, { status: 401 });
        }

        const user = await prisma.user.findUnique({
            where: { clerrUserId: userId },
        });

        if (!user || user.role !== "ADMIN") {
            return NextResponse.json(
                { error: "Admin access required" },
                { status: 403 }
            );
        }

        const { status } = await request.json();
        const postId = parseInt(params.id);

        if (!STATUS_ORDER.includes(status)) {
            return NextResponse.json(
                { error: "Invalid status" },
                { status: 400 }
            );
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: { status },
            include: { author: true, votes: true },
        });

        return NextResponse.json(updatedPost);
    } catch (error) {
        console.error("Error updating post status:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}