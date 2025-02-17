import { Text } from "@chakra-ui/react";
import React from "react";

const DetailsPage = async ({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) => {
  const data = (await params).orderId;

  return (
    <div>
      <Text>details orderId {data} </Text>
    </div>
  );
};

export default DetailsPage;
