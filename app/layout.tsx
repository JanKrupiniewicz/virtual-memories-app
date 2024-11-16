import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SessionContextProvider } from "@/store/session-context";

export const metadata: Metadata = {
  title: "Wirtuale Wspomnienia",
  description: "Aplikacja do przechowywania wspomnień w formie geolokalizacji.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={cn("min-h-screen bg-background font-sans antialiased")}
      >
        <SessionContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />
            {children}
            <Footer />
          </ThemeProvider>
        </SessionContextProvider>
      </body>
    </html>
  );
}
