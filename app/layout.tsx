import "./globals.css";
import { Menu } from "./ui/common/menu";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-[#f5f5f5] font-bold text-lg font-[Manrope] flex min-h-screen">
                <Menu />
                <main className="ml-64 flex-1 p-10">{children}</main>
            </body>
        </html>
    );
}
