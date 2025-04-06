import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { APP_ROUTES } from "_/app/config/routes";
import { authOptions } from "_/app/api/auth/[...nextauth]/route";
import { getRedirectRoute } from "_/app/hooks/dynamic-redirect";
import Layout from "../Layout";

export default async function PrivateDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect(APP_ROUTES.PUBLIC.HOME); // Ou APP_ROUTES.PUBLIC.SIGN_IN
  }

  const roles = session?.roles || [];
  const hasAccess = roles.includes("admin") || roles.includes("manager");

  if (!hasAccess) {
    redirect(getRedirectRoute(roles));
  }

  return <Layout>{children}</Layout>;
}
