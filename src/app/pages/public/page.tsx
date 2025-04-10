import { PublicProductList } from './products/components/PublicProduct';
import WithHeaderLayout from '../../layout-container/protected/WithHeaderLayout';

export default function ProductsPage() {
  return (
    <WithHeaderLayout>
      <PublicProductList />
    </WithHeaderLayout>
  );
}
