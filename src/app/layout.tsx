"use client";

import { Poppins } from "next/font/google";
import { Provider } from "_/components/ui/provider";
import "./globals.css";
import { ColorModeProvider } from "_components/ui/color-mode";
import ProtectedRoute from "./layout/protected/ProtectedRoute";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import NProgress from "nprogress";
import "../components/custom/progess-bar/progress.css";

const poppins = Poppins({
  weight: ["400", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    NProgress.start();
    const handleLoad = () => {
      NProgress.done();
    };
    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }
    return () => {
      window.removeEventListener("load", handleLoad);
      NProgress.done();
    };
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable}`}>
        <Provider>
          <ColorModeProvider>
            <ProtectedRoute>{children}</ProtectedRoute>
          </ColorModeProvider>
        </Provider>
      </body>
    </html>
  );
}
