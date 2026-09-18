import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "memii",
  description: "Your little space to organise life.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const savedTheme = localStorage.getItem("theme");

                if (savedTheme === "dark") {
                  document.documentElement.classList.add("dark");
                }
              } catch (error) {
                console.error("Unable to load saved theme:", error);
              }
            `,
          }}
        />
      </head>

      <body className={`${nunito.variable} min-h-full antialiased`}>
        {children}
      </body>
    </html>
  );
}