import "./globals.css";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-[#f5f5f5] font-bold text-[28px] font-[Manrope]">
                <main className="flex justify-center items-center min-h-screen pt-10 pb-10">
                    {children}
                </main>
            </body>
        </html>
    );
}
