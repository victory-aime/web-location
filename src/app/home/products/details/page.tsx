import { getServerSession } from "next-auth";

import DetailsProducts from "../components/ProductDetail";
import { authOptions } from "_/app/api/auth/[...nextauth]/route";
import WithHeaderLayout from "_/app/layout-container/protected/WithHeaderLayout";

export default async function DetailsProductsPage() {
  const session = await getServerSession(authOptions);
  return (
    <WithHeaderLayout>
      <DetailsProducts session={session} />
    </WithHeaderLayout>
  );
}
