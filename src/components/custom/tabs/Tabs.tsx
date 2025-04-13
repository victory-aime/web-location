import { Box, Flex, HStack, Tabs } from '@chakra-ui/react';
import { TabsProps } from './interface/table';
import { hexToRGB } from '_/theme/colors';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { TbFilter } from 'react-icons/tb';
import { BaseButton } from '../button';
import BoxContainer from '../container/BoxContainer';

export const CommonTabs = ({
  items,
  redirectLink,
  isMobile,
  title = 'Mes Produits',
  description = 'Gerer vos produits',
  addTitle,
  ...rest
}: TabsProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <BoxContainer border={'none'} title={title} description={description}>
      <Tabs.Root
        defaultValue={items[currentIndex]?.label}
        variant={'plain'}
        value={items[currentIndex]?.label}
        onValueChange={({ value }: { value: string }) => {
          const index = items?.findIndex((item) => item?.label === value);
          setCurrentIndex(index);
        }}
        mt={30}
        {...rest}
      >
        <Flex
          width={'full'}
          alignItems={'center'}
          justifyContent={'space-between'}
          flexDirection={{ base: 'column', md: 'row' }}
          overflowX={'auto'}
          gap={5}
        >
          <Tabs.List
            bg={'bg.muted'}
            border={'1px solid'}
            borderColor={'gray.700'}
            rounded="lg"
            p={'4px'}
          >
            {items.map((item, index) => (
              <Tabs.Trigger
                color={currentIndex === index ? 'primary.500' : 'gray.400'}
                key={index}
                value={item.label}
                p={5}
              >
                {isMobile ? <></> : <>{item?.icon}</>}
                {item.label}
              </Tabs.Trigger>
            ))}
            <Tabs.Indicator rounded="l2" bgColor={hexToRGB('primary', 0.2)} />
          </Tabs.List>
          <HStack
            width={'full'}
            p={'4px'}
            gap={4}
            alignItems={{ base: 'flex-start', md: 'flex-end' }}
            justifyContent={{ base: 'flex-start', md: 'flex-end' }}
          >
            {addTitle && (
              <>
                <BaseButton
                  p={'5px'}
                  colorType={'secondary'}
                  leftIcon={<TbFilter />}
                  width={{ base: 'full', md: 'auto' }}
                />

                <BaseButton
                  bgColor={'primary.500'}
                  p={'8px'}
                  leftIcon={<FaPlus />}
                  onClick={() => redirectLink && redirectLink()}
                >
                  {addTitle}
                </BaseButton>
              </>
            )}
          </HStack>
        </Flex>

        <Box mt={10} mb={50}>
          {items.map((item, index) => (
            <Tabs.Content
              key={index}
              value={item.label}
              _open={{
                animationName: 'fade-in, scale-in',
                animationDuration: '300ms',
              }}
              _closed={{
                animationName: 'fade-out, scale-out',
                animationDuration: '120ms',
              }}
            >
              {item?.content}
            </Tabs.Content>
          ))}
        </Box>
      </Tabs.Root>
    </BoxContainer>
  );
};
