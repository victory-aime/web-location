import { getServerSession } from "next-auth";
import { Poppins } from "next/font/google";
import { authOptions } from "../api/auth/[...nextauth]/route";
import AppMainEntry from "../app";

const poppins = Poppins({
  weight: ["400", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable}`}>
        <AppMainEntry session={session}>{children}</AppMainEntry>
      </body>
    </html>
  );
}
