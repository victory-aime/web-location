import { Box, Flex, Text, Image } from '@chakra-ui/react'
import { ListMenu } from '_assets/svg'
import { UsersModule } from 'bvg-innovation-state-management'
import { useSession } from 'next-auth/react'
import { SideBarProps } from '../sidebar/types'
import { useQueryClient } from '@tanstack/react-query'
import { TYPES } from 'bvg-innovation-shared'
import { globalApplicationContext } from '_config/globalState'

export const Header = ({ onShowSidebar, session }: SideBarProps) => {
  const queryClient = useQueryClient()
  const { status } = useSession()
  const cachedUser = queryClient.getQueryData<TYPES.MODELS.USERS.IUser>([UsersModule.constants.WOHAMI])
  const token = globalApplicationContext.getToken()
  const { data: user } = UsersModule.userInfoQueries({
    payload: { userId: session?.keycloakId ?? '' },
    queryOptions: {
      enabled: !cachedUser && !!session?.keycloakId && status !== 'loading' && !token,
    },
  })

  return (
    <Flex as="header" p={4} justify={'space-between'} alignItems="center" boxShadow={'0 0 35px black.50'} position={'relative'} h={{ base: '100px', md: 'auto' }}>
      <Box ms={'2px'} display="flex" alignItems="center" onClick={onShowSidebar} cursor="pointer">
        <ListMenu width={25} height={25} />
      </Box>

      <Box ms={5} display="flex" alignItems="center">
        <Flex alignItems={{ base: 'center', md: 'flex-start' }} justifyContent={'flex-end'} flexDir={{ base: 'row', md: 'row-reverse' }} gap={3} width={'100%'}>
          <Box display={{ base: 'flex', md: 'block' }} truncate maxW={'200px'} flexWrap={'wrap'} color={'gray.400'} fontSize={'13px'}>
            <Text>Bonjour,</Text>
            <Text> {user?.name ?? ''}</Text>
          </Box>
          <Image draggable="false" src={'https://avatar.iran.liara.run/public'} boxSize={'30px'} borderRadius={'7px'} fit="cover" objectPosition="center" alt="img-url" />
        </Flex>
      </Box>
    </Flex>
  )
}
