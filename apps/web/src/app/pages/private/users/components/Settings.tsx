import { Flex, Stack, Box, For, VStack, Separator } from '@chakra-ui/react'
import { BoxContainer, SwitchColorMode, BaseText, TextVariant } from '_components/custom'
import React from 'react'

const Settings = () => {
  const settingsItem = [
    {
      content: (
        <Flex width={'full'} alignItems={'center'} justifyContent={'space-between'}>
          <Stack gap={2}>
            <BaseText>Apparence</BaseText>
            <BaseText variant={TextVariant.S} color={'gray.400'}>
              Apparence
            </BaseText>
          </Stack>
          <SwitchColorMode hideIcon />
        </Flex>
      ),
    },
    {
      content: (
        <Flex width={'full'} alignItems={'center'} justifyContent={'space-between'}>
          <Stack gap={2}>
            <BaseText>Langage</BaseText>
            <BaseText variant={TextVariant.S} color={'gray.400'}>
              Chosissez votre langue
            </BaseText>
          </Stack>
          <SwitchColorMode hideIcon />
        </Flex>
      ),
    },
    {
      content: (
        <Flex width={'full'} alignItems={'center'} justifyContent={'space-between'}>
          <Stack gap={2}>
            <BaseText>Two-factor Authentification(2FA)</BaseText>
            <BaseText variant={TextVariant.S} color={'gray.400'}>
              Keep your account secure by enabling 2FA via email
            </BaseText>
          </Stack>
          <SwitchColorMode hideIcon />
        </Flex>
      ),
    },
  ]
  return (
    <BoxContainer border={'none'} p={{ base: 5, md: 10 }} title={'Paramètres'}>
      <Box gap={5} mt={5} width={'full'}>
        <For each={settingsItem}>
          {(item, index) => (
            <Box key={index}>
              <VStack gap={8} width={'full'} key={index} alignItems={'flex-start'}>
                {item.content}
              </VStack>
              <Separator mt={3} mb={3} />
            </Box>
          )}
        </For>
      </Box>
    </BoxContainer>
  )
}

export default Settings
