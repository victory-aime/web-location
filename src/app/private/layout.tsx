import { Bricolage_Grotesque } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "_app/api/auth/[...nextauth]/route";
import AppMainEntry from "_app/app";
import Layout from "_app/layout-container";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html className={bricolage.variable} lang="en" suppressHydrationWarning>
      <body>
        <AppMainEntry session={session}>
          <Layout session={session}>{children}</Layout>
        </AppMainEntry>
      </body>
    </html>
  );
}
