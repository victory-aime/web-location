import WithHeaderLayout from "_/app/layout-container/protected/WithHeaderLayout";
import ManageUserProfile from "../components/ManageUserProfile";
import { authOptions } from "_/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  return (
    <WithHeaderLayout>
      <ManageUserProfile session={session} />
    </WithHeaderLayout>
  );
}
