import { TabsRootProps } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface TabsProps extends TabsRootProps {
  items: {
    label: string;
    icon: ReactNode;
    content: ReactNode | string | any;
  }[];
  title?: string;
  description?: string;
  addTitle?: string;
  redirectLink?: () => void;
  isMobile?: boolean;
}

export type { TabsProps };
