import DetailsProducts from '../components/ProductDetail';
import WithHeaderLayout from '_/app/layout-container/protected/WithHeaderLayout';

export default function DetailsProductsPage() {
  return (
    <WithHeaderLayout>
      <DetailsProducts  />
    </WithHeaderLayout>
  );
}
