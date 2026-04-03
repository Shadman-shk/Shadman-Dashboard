import type { Metadata } from "next";
import "./globals.css";
import {Inter} from "next/font/google";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

const inter = Inter ({subsets:['latin']});


export const metadata: Metadata = {
  title: "Feedback Fusion",
  description: "A platform for users to suggest and vote on features, report bugs, and provide feedback to developers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* <Navbar /> */}
        <Navbar />
        {/*Main section*/}
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>
        {/*Footer */}
        <Footer />
        </body>
    </html>
  );
}
