import WithHeaderLayout from "_/app/layout-container/protected/WithHeaderLayout";
import Cart from "../../components/Cart";

export default function CartPage() {
  return (
    <WithHeaderLayout>
      <Cart />
    </WithHeaderLayout>
  );
}
