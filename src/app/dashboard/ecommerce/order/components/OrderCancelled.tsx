import { CustomBadge } from '_/components/custom/badge';
import { CommonDataTable } from '_/components/custom/data-table';
import { ColumnsDataTable } from '_/components/custom/data-table/interface/data-types';
import React, { useState } from 'react';
import { RenderProductImage } from '../../products/components';
import { ordersCancelledData } from '../data/data';

const OrderCancelled = () => {
  const pageSize = 10;
  const totalPages = Math.ceil(ordersCancelledData?.length / pageSize);
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
          handleClick: (value) => console.log('value clicked', value),
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
      data={ordersCancelledData}
      columns={columns}
      initialPage={1}
      totalItems={totalPages}
      pageSize={pageSize}
      handleRowSelection={setSelectedRows}
      lazy
    />
  );
};

export default OrderCancelled;
