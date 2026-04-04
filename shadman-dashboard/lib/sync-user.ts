import { currentUser } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import image from "next/image";

export async function syncCurrenUser() {
    try {
        //Get user data from clerk
        const clerkUser = await currentUser();

        if (!clerkUser) {
            return null;
        }

        const email = clerkUser.emailAddresses[0].emailAddress;

        if (!email) {
            throw new Error("user email not found")
        }


        //Check if user exist in db
        let dbuser = await prisma.user.findUnique({
            where: {
                clerrUserId: clerkUser.id
            }

        });
        if (dbuser) {
            //Update existing user
            dbuser = await prisma.user.update({
                where: {
                    id: dbuser.id
                },
                data: {
                    email: email,
                    name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                    image: clerkUser.imageUrl
                },
            });
        } else {
            //Create new user in database
            //Check if this is the first user- make them admin
            const userCount = await prisma.user.count();
            const isFirstUser = userCount === 0;

            dbuser = await prisma.user.create({
                data: {
                    clerrUserId: clerkUser.id,
                    email: email,
                    name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim(),
                    image: clerkUser.imageUrl,
                    role: isFirstUser ? "ADMIN" : "USER",
        },
        
    });
       console.log(`New user created: ${email} with role ${dbuser.role}`);
    } 
     return dbuser;
 } catch (error) {
        console.error("Error synching user from Clerk:" ,error);
        throw error;
    }

}

