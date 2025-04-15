import {ReactNode} from "react";
import {CardBodyProps, CardRootProps} from "@chakra-ui/react";

export interface TypeProps extends CardBodyProps, CardRootProps {
    items?: {
        label: string;
        icon: ReactNode;
        content: ReactNode | string | any;
    }[];
    label?: string;
}