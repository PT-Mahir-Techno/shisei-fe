import type { Metadata } from "next";
import { Noto_Serif_JP, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: 'swap', 
  adjustFontFallback: false
});


const noto_serif = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["400", "500", "600", "700", "900"],
  display: 'swap', 
  adjustFontFallback: false
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(poppins.variable, noto_serif.variable)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
