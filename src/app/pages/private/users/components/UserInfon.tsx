import { Box, Flex, VStack, Separator } from '@chakra-ui/react';
import { keycloakSessionLogOut } from '_/app/hooks/logout';
import { BaseText, TextVariant } from '_/components/custom/base-text';
import { BaseButton } from '_/components/custom/button';
import { Avatar } from '_/components/ui/avatar';
import { AuthModule, LoaderModule, UsersModule } from '_/store/src/modules';
import { hexToRGB } from '_/theme/colors';
import { clearPersistedStorage } from '_/utils/clear.store.utils';
import { signOut, useSession } from 'next-auth/react';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { BsCart, BsHeart } from 'react-icons/bs';
import { HiOutlineUser } from 'react-icons/hi2';
import { IoIosCog } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

interface Props {
  currentStep: number | string | null;
  onChangeStep: Dispatch<SetStateAction<number>>;
}

const UserInfo = ({ currentStep, onChangeStep }: Props) => {
  const { status } = useSession();
  const { user, isLoading } = useSelector(UsersModule.selectors.userSelector);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const renderStepMap = [
    {
      icon: <HiOutlineUser />,
      title: 'Informations personnelles',
    },
    {
      icon: <BsCart />,
      title: 'Mes commandes',
    },
    // {
    //   icon: <LuMapPin />,
    //   title: "Gerer mes addresses",
    // },
    {
      icon: <BsHeart />,
      title: 'My Wishlist',
    },
    {
      icon: <IoIosCog />,
      title: 'Parametres',
    },
  ];

  return (
    <Box
      width={{ base: 'full', lg: '1/3' }}
      borderRadius={'7px'}
      height={{ base: 'fit-content', lg: '500px' }}
      boxShadow={'lg'}
    >
      <Box
        pl={'10px'}
        pr={'10px'}
        mt={'30px'}
        mb={'30px'}
        display={'flex'}
        flexDir={'row'}
        alignItems={'center'}
        gap={2}
      >
        <Avatar size={'xl'} name={user?.name + ' ' + user?.firstName} />
        <Box>
          <BaseText>Bonjour,👋</BaseText>
          <BaseText variant={TextVariant.S}>{user?.name + ' ' + user?.firstName}</BaseText>
        </Box>
      </Box>
      <Separator mt={4} mb={4} />
      <VStack alignItems={'flex-start'} pl={'10px'} pr={'10px'} mt={'30px'} mb={'30px'}>
        {renderStepMap?.map((item, index) => (
          <Flex
            key={index}
            width={'100%'}
            alignItems={'center'}
            justifyContent={'flex-start'}
            borderRadius={currentStep === index ? '7px' : ''}
            onClick={() => {
              onChangeStep(index);
            }}
            bgColor={currentStep === index ? hexToRGB('blue', 0.5) : ''}
            p={'10px'}
            _hover={{
              background: hexToRGB('blue', 0.1),
              borderRadius: '7px',
              cursor: 'pointer',
            }}
            gap={'20px'}
          >
            {item.icon}
            <BaseText>{item.title}</BaseText>
          </Flex>
        ))}

        {status === 'authenticated' && (
          <BaseButton
            mt={'30px'}
            onClick={() => {
              keycloakSessionLogOut().then(() => {
                signOut({ callbackUrl: process.env.NEXTAUTH_URL });
                setLoading(false);
                dispatch(LoaderModule.actions.hideLoaderAction());
              });
              dispatch(AuthModule.actions.clearKeys());
              dispatch(LoaderModule.actions.showLoaderAction());
              setLoading(true);
              clearPersistedStorage();
            }}
            width={'full'}
            colorType={'danger'}
            isLoading={loading}
            withGradient
          >
            Deconnexion
          </BaseButton>
        )}
      </VStack>
    </Box>
  );
};

export default UserInfo;
