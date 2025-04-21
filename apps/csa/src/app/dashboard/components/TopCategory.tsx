'use client'
import { Box, Flex, Text, Image, FormatNumber, Stat, Badge } from '@chakra-ui/react'
import { BaseButton, BoxContainer } from '_components/custom'
import React from 'react'

export const TopCategory = () => {
  return (
    <BoxContainer>
      <Flex p={4} width={'full'} alignItems={'center'} justifyContent={'space-between'}>
        <Box>
          <Text>TopCategory</Text>
          <Text color={'gray.700'}>Desc</Text>
        </Box>
        <BaseButton colorType="primary">Voir plus</BaseButton>
      </Flex>
      {Array.from({ length: 5 }).map((_, index) => (
        <Box key={index} p={4}>
          <Flex alignItems={'center'} justifyContent={'space-between'} gap={4}>
            <Flex alignItems={'center'} gap={3}>
              <Flex alignItems={'center'} justifyContent={'center'} bg={'primary.500'} borderRadius={'full'} width={'40px'} height={'40px'}>
                <Image src="https://avatar.iran.liara.run/public" />
              </Flex>
              <Flex flexDir={'column'} alignItems={'flex-start'}>
                <Text>Mouse</Text>
                <Text color={'gray.700'}>saleNumber</Text>
              </Flex>
            </Flex>
            <Flex>
              <Stat.Root flexDir={'row'} alignItems={'center'} gap={2}>
                <Stat.ValueText fontSize={'16px'}>
                  <FormatNumber value={1600} notation="compact" currency="USD" style="currency" />
                </Stat.ValueText>
                <Badge borderRadius={'full'} p={2} colorPalette="red" variant="solid">
                  <Stat.DownIndicator />
                  1.9%
                </Badge>
              </Stat.Root>
            </Flex>
          </Flex>
        </Box>
      ))}
    </BoxContainer>
  )
}
