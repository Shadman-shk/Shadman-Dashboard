"use client"
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";    
import { Input } from "@/components/ui/input";
import { CATEGORIES_TYPES } from "@/app/data/category-data";
import { Textarea } from "@/components/ui/textarea";
import { useActionState } from "react";
import { toast } from "sonner";

//Server action function
export async function submitFeedBack(prevState:{success: boolean, error: string }, formData: FormData) {
   // Show loading toast
   const loadingToast = toast.loading("Submitting feedback...");

    try {
        const response= await fetch("/api/feedback", {
            method: "POST",
            headers: {"Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: formData,
                description: formData.get("description"),
                category: formData.get("category")
        }),
    });
    if(!response.ok){
       throw new Error("Failed to create post")
    }

    //Dismiss loading toast and show success
    toast.dismiss(loadingToast);
    toast.success("Your feedback has been successfully submitted");

    return{
        success:true,
        error:""
    }
}catch (error) {
    console.error("Something went wrong. Please try again. ", error);
        //Dismiss loading toast and show success
    toast.dismiss(loadingToast);
    toast.error("Something went wrong");
     }
      return{
        success:false,
        error:"Failed to submit feedback"
    }
}
        
;


export default function NewFeedbackPage() {
    const [state, action, isPending]= useActionState(submitFeedBack, {
       success: false,
       error: "",
    });
    return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <Link href="/feedback">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>

        <h1 className="text-3xl font-bold">Share your feedback</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Feedback</CardTitle>
          <CardDescription>
             Shre your ideoa with the community and please ne specific on your feedback.
          </CardDescription>
          <CardContent>
              <form action={action} className="space-y-6">
                 <div className="space-y-2">
                    <label htmlFor="title" >
                        Title
                    </label>
                    <Input id="title" name="title" placeholder="Enter feedback title" required/>
                 </div>
                 <div className="space-y-2">
                  <label htmlFor="category" >
                    Category
                  </label>
                  <select name="category" id="category" className="w-full px-3 py-2 border rounded-md bg-background" defaultValue={CATEGORIES_TYPES[0]}>
                    {CATEGORIES_TYPES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="description" >
                        Description
                    </label>
                    <Textarea id="description" name="description" placeholder="Describe your ideas in detail" required/>
                 </div>
                 <div className="flex gap-4">
                    <Button type="submit" disabled={isPending}>
                        {isPending ? "submitting" : "submit feedback"}
                    </Button>
                    <Button type="button" variant={"outline"}>
                        <Link href="/feedback">Cancel</Link>
                    </Button>
                 </div>
              </form>
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}