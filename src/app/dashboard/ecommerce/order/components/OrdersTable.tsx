import React, { useEffect } from 'react';
import { ColumnsDataTable } from '_components/custom/data-table/interface/data-types';
import { RenderProductImage } from '../../products/components';
import { CustomBadge } from '_components/custom/badge';
import { CommonDataTable } from '_components/custom/data-table';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '_app/config/routes';
import { useDispatch, useSelector } from 'react-redux';
import { OrdersModule, UsersModule } from '_/store/src/modules';
import { BaseText } from '_components/custom/base-text';
import { UTILS } from '_store/src';
import { CustomFormatNumber } from '_components/custom/format-number';

const OrdersTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading, storeOrderList } = useSelector(OrdersModule.selectors.ordersSelector);
  const { user } = useSelector(UsersModule.selectors.userSelector);

  const columns: ColumnsDataTable[] = [
    { header: 'Numero de la commande', accessor: 'orderId' },
    {
      header: 'Produits',
      accessor: 'product',
      cell: (value) => {
        return <RenderProductImage value={value} />;
      },
    },
    {
      header: 'Client',
      accessor: 'order',
      cell: (value) => {
        return <BaseText>{value?.user?.name + ' ' + value?.user?.firstName}</BaseText>;
      },
    },
    {
      header: 'Quantity',
      accessor: 'quantity',
    },
    {
      header: 'Total',
      accessor: 'order',
      cell: (value) => {
        return <CustomFormatNumber value={value?.totalPrice} />;
      },
    },
    {
      header: 'Date',
      accessor: 'order',
      cell: (value) => {
        return UTILS.formatCreatedAt(value?.createdAt);
      },
    },
    {
      header: 'Status',
      accessor: 'order',
      cell: (value) => {
        return <CustomBadge status={value?.status} />;
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'view',
          handleClick: (value) => {
            router.push(`${APP_ROUTES.PRIVATE.ECOMMERCE.ORDER.DETAILS}?orderItemId=${value?.id}`);
          },
        },
        {
          name: 'delete',
          handleClick: (value) => console.log('value clicked', value),
        },
      ],
    },
  ];

  useEffect(() => {
    if (user?.id) {
      dispatch(OrdersModule.actions.getStoreOrderListRequestAction({ storeId: user?.store?.id }));
    }
  }, []);

  return (
    <CommonDataTable
      data={storeOrderList?.content}
      columns={columns}
      isLoading={loading}
      totalItems={storeOrderList?.totalDataPerPage!}
      pageSize={storeOrderList?.totalPages!}
      hidePagination={storeOrderList?.totalPages === 1}
      lazy
    />
  );
};

export default OrdersTable;
