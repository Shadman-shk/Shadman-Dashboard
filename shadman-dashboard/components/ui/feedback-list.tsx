"use client";
import { useState } from "react";
import { Card } from "./card";
import { CardHeader, CardDescription, CardTitle, CardContent } from "./card";
import { User } from "lucide-react";
import { STATUS_GROUPS } from "@/app/data/status-data";
import { Badge } from "lucide-react";
import { getCategoryDesign } from "@/app/data/category-data";
import { Button } from "./button";
import { ThumbsUp } from "lucide-react";


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
                                        <Badge className="flex items-center gap-1">
                                            <StatusIcon className="h-3 w-3" />
                                            <span>{statusGroup.title}</span>
                                        </Badge>
                                    );
                                })()}
                                {/* Categories Badge*/}
                                 {(() => {
                                    const design= getCategoryDesign(post.category)
                                    const Icon= design.icon;

                                    return (
                                        <Badge className="flex items-center gap-1">
                                            variant="outline"
                                            <Icon className="h-3 w-3" />
                                            {post.category}
                                        </Badge>
                                    );
                                })()}
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                       <p className="text-muted-foreground mb-3">
                        {post.description}
                       </p>
                    </CardContent>
                </Card>
            ))}
        </div >
    );
}