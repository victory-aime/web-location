import WithHeaderLayout from '_/app/layout-container/protected/WithHeaderLayout';
import CheckoutProcess from '../../components/CheckoutProcess';

export default  function CartPage() {
  return (
    <WithHeaderLayout>
      <CheckoutProcess />
    </WithHeaderLayout>
  );
}
