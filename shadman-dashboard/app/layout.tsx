import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter, The_Girl_Next_Door } from "next/font/google";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "sonner";
import { syncCurrenUser } from "@/lib/sync-user";

const inter = Inter({ subsets: ['latin'] });


export const metadata: Metadata = {
  title: "Feedback Fusion",
  description: "A platform for users to suggest and vote on features, report bugs, and provide feedback to developers.",
};


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await syncCurrenUser();
  return (
    
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ClerkProvider>
          <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            {/* Navbar */}
            <Navbar />
            {/* Main section */}
            <main className="container mx-auto px-4 py-8">{children}</main>
            {/* Footer */}
            <Footer />
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );

}
