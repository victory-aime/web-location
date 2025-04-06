import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import { PublicProductList } from "./products/components/PublicProduct";
import WithHeaderLayout from "../layout-container/protected/WithHeaderLayout";

export default async function ProductsPage() {
  const session = await getServerSession(authOptions);
  return (
    <WithHeaderLayout>
      <PublicProductList session={session} />
    </WithHeaderLayout>
  );
}
