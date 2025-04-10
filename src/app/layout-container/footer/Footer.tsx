import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { footerStyles } from '../layout.styles';
import LinkFooter from './LinkFooter';

const Footer = () => {
  return (
    <Flex {...footerStyles}>
      <Text color={'white'} fontWeight={'800'}>
        RENTAL LOCATION {new Date().getFullYear()} ©
      </Text>
      <Box pos={'fixed'} right={'20px'}>
        <LinkFooter />
      </Box>
    </Flex>
  );
};

export default Footer;
