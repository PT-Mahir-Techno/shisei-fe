import "./styles/globals.css";
import "./styles/animations.css";

import type { Metadata } from "next";
import { Noto_Serif_JP, Poppins } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";
import ProgressProviders from "@/providers/ProgressBarProvider";
import { EffectProvider } from "@/providers/effect-provider";
import { ToasterProvider } from "@/providers/toast-provider";
import { AuthProvider } from "@/providers/auth-provider";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: 'swap', 
  adjustFontFallback: false
});


const noto_serif = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif",
  weight: ["600", "700", ],
  display: 'swap', 
  adjustFontFallback: false
})

export const metadata: Metadata = {
  title: "Be Style",
  description: "The best place for therapy that helps you discovera better version of yourself",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${cn(poppins.variable, noto_serif.variable)}`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            // disableTransitionOnChange
        >
          <EffectProvider>
          <ProgressProviders>
            <ToasterProvider/>
            <AuthProvider>
              {children}
            </AuthProvider>
          </ProgressProviders>
          </EffectProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
