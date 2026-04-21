"use client";
import { useState } from "react";
import { Card } from "./card";
import { CardHeader, CardDescription, CardTitle, } from "./card";
import { User } from "lucide-react";

export default function FeedbackList({
    initialPosts,
    userId,
}: {
    initialPosts: any[];
    userId: string | null;
}) {
    const [posts, setPosts] = useState(initialPosts);
    return (
        <div className="space-y-4">
            {posts.map((post) => (
                <Card key={post.id} className="hover: shadow-md transition-shadow border">
                    <CardHeader>
                        <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                                <CardTitle className="text-lg">
                                    {post.title}
                                </CardTitle>

                                <CardDescription className="flex items-center gap-1.5 mt-1">
                                    <User className="h-3 w-3" />
                                    {post.author.name}
                                </CardDescription>
                            </div>
                            <div className="flex gap-1.5">
                                {/* Status Badge */}
                                {(() => {
                                    const statusGroup =
                                        STATUS_GROUPS[post.status as keyof typeof STATUS_GROUPS];

                                    if (!statusGroup) return null;

                                    const StatusIcon = statusGroup.icon;

                                    return (
                                        <div className="flex items-center gap-1">
                                            <StatusIcon className="h-4 w-4" />
                                            <span>{statusGroup.label}</span>
                                        </div>
                                    );
                                })()}
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            ))}
        </div >
    );
}