export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="border-t bg-background mt-auto">
            <div className="container mx-auto px-4 py-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-sm text-muted-forground">
                        <span>Made by</span>
                        <span>Shadman Hossain</span>
                    </div>
                    <div>
                         <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>{currentYear} Feedback Fusion. All rights reserved.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )

}