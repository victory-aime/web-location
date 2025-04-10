import React, { useState } from 'react';
import { ordersTableData } from '../data/data';
import { ColumnsDataTable } from '_/components/custom/data-table/interface/data-types';
import { RenderProductImage } from '../../products/components';
import { CustomBadge } from '_/components/custom/badge';
import { CommonDataTable } from '_/components/custom/data-table';
import { useRouter } from 'next/navigation';
import { APP_ROUTES } from '_/app/config/routes';

const OrdersTable = () => {
  const pageSize = 10;
  const totalPages = Math.ceil(ordersTableData?.length / pageSize);
  const router = useRouter();
  const [selectedRows, setSelectedRows] = useState<any>([]);

  const columns: ColumnsDataTable[] = [
    { header: '', accessor: 'select' },
    { header: 'Numero de la commande', accessor: 'orderId' },
    {
      header: 'Produits',
      accessor: 'product',
      cell: (value) => {
        return <RenderProductImage value={value} />;
      },
    },
    {
      header: 'Date',
      accessor: 'date',
    },
    {
      header: 'Clients',
      accessor: 'client',
    },
    {
      header: 'Total',
      accessor: 'totalAmount',
    },
    {
      header: 'Paiement',
      accessor: 'payment',
    },
    {
      header: 'Status',
      accessor: 'status',
      cell: (value) => {
        return <CustomBadge status={value} />;
      },
    },
    {
      header: 'Actions',
      accessor: 'actions',
      actions: [
        {
          name: 'edit',
          title: 'edit les value',
          handleClick: (value) => console.log('value clicked', value),
        },
        {
          name: 'view',
          handleClick: (value) => {
            router.push(`${APP_ROUTES.PRIVATE.ECOMMERCE.ORDER.DETAILS}?orderId=${value?.orderId}`);
          },
        },
        {
          name: 'delete',
          handleClick: (value) => console.log('value clicked', value),
        },
      ],
    },
  ];
  return (
    <CommonDataTable
      data={ordersTableData}
      columns={columns}
      initialPage={1}
      totalItems={totalPages}
      pageSize={pageSize}
      handleRowSelection={setSelectedRows}
      lazy
    />
  );
};

export default OrdersTable;
