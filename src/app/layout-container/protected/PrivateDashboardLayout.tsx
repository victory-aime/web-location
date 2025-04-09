import { getServerSession } from "next-auth";
import { authOptions } from "_/app/api/auth/[...nextauth]/route";
import Layout from "../Layout";

export default async function PrivateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return <Layout session={session}>{children}</Layout>;
}
