import { GradientHeader } from "@/components/ui/gradient-header";
import { duplexPair } from "stream";
import { Button } from "@/components/ui/button";
import Link from "next/dist/client/link";
import { ArrowRight, BarChart, Map, User, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <GradientHeader
        title="Shape the Future of Innovation"
        subtitle="FeedBack Fusion empowers you to share your ideas, vote on features, and collaborate with developers to create the products you love."
      >
        <div className="flex gap-4 justify-center pt-4">
          <Button size="lg" className="bg-white text-blue-600 hover:bg-grey-100">
            <Link href="/feedback/new">Submit Feedback <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
          <Button size="lg" className="bg-white text-black hover:bg-grey-100">
            <Link href="/roadmap">View Roadmap <Map className=" ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </GradientHeader >
      {/* feature Section */}
      <section>
        <h2 className="text-3xl font-bond text-center mb-8">How It Works</h2>
        <div className="grid grid-cols-1 mf:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Submit Ideas</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground ">Share your suggestion and feature resquest with the community</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <BarChart className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Vote & Prioritize </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground ">Upvote ideas that matter to you</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <User className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Track Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground ">
                   Follow or public roadmap to see what we are working on next
              </p>
            </CardContent>
          </Card><Card>
            <CardHeader>
              <Zap className="h-8 w-8 text-primary mb-2" />
              <CardTitle>See Results</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground ">
                    Watch your ideas come to life as developers implement the most popular features
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      {/* Stats Section */}
      <section className="text-center">
        <div className="inline-grid grid-cols-3 gap-8">
          <div>
            <div className="text-3xl font-bold"> 1,256+</div>
            <div className="text-muted-foreground"> Suggestions</div>
          </div>
          <div>
            <div className="text-3xl font-bold"> 8,901+</div>
            <div className="text-muted-foreground"> VOtes Cast</div>
          </div>
          <div>
            <div className="text-3xl font-bold"> 256+</div>
            <div className="text-muted-foreground"> Features Shipped</div>
          </div>
        </div>
      </section>
    </div >

  );
}

