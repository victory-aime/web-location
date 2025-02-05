import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { Provider } from "_/components/ui/provider";
import "./globals.css";
import { ColorModeProvider } from "_components/ui/color-mode";

const poppins = Poppins({
  weight: ["400", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "bvg-innovation",
  description:
    "An innovative IT startup focused on delivering cutting-edge technology solutions to drive business success and digital transformation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable}`}>
        <Provider>
          <ColorModeProvider>{children}</ColorModeProvider>
        </Provider>
      </body>
    </html>
  );
}
