import WithHeaderLayout from '_/app/layout-container/protected/WithHeaderLayout';
import ProductViewList from './components/ProductViewList';

export default function ProductViewListHome() {
  return (
    <WithHeaderLayout>
      <ProductViewList />
    </WithHeaderLayout>
  );
}
