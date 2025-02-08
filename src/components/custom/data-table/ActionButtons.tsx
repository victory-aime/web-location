// import React from "react";
// import { Button, IconButton } from "@chakra-ui/react";
// import { ActionProps } from "./CommonTable";
// import { Tooltip } from "_components/ui/tooltip";

// interface ActionButtonsProps<T> {
//   actions: ActionProps<T>[];
//   data: T;
// }

// const ActionButtons = <T,>({ actions, data }: ActionButtonsProps<T>) => {
//   const getButtonProps = (action: ActionProps<T>) => {
//     const isDisabled = action.isDisabled ? action.isDisabled(data) : false;
//     const isShown = action.isShown
//       ? typeof action.isShown === "function"
//         ? action.isShown(data)
//         : action.isShown
//       : true;
//     return { isDisabled, isShown };
//   };

//   return (
//     <>
//       {actions.map((action, index) => {
//         const { isDisabled, isShown } = getButtonProps(action);
//         if (!isShown) return null;
//         const label =
//           typeof action.name === "string" ? action.name : action.name(data);

//         const buttonContent = action.titleIcon ? (
//           <IconButton
//             aria-label={label}
//             onClick={() => action.handleClick(data)}
//             disabled={isDisabled}
//             variant="outline"
//             size="sm"
//             m={1}
//           >
//             {action.titleIcon}
//           </IconButton>
//         ) : (
//           <Button
//             onClick={() => action.handleClick(data)}
//             disabled={isDisabled}
//             variant="outline"
//             size="sm"
//             m={1}
//           >
//             {label}
//           </Button>
//         );

//         return action.title ? (
//           <Tooltip key={index} content={action.title}>
//             {buttonContent}
//           </Tooltip>
//         ) : (
//           <React.Fragment key={index}>{buttonContent}</React.Fragment>
//         );
//       })}
//     </>
//   );
// };

// export default ActionButtons;

import { Flex, Icon, IconButton } from "@chakra-ui/react";
import { useTheme } from "@chakra-ui/system";
import React, { memo } from "react";
import { ArrowDown, HomeIcon, Dot } from "_assets/svg";
import { BiMoney } from "react-icons/bi";
import { Tooltip } from "_components/ui/tooltip";

export interface ActionProps<T> {
  name: string | ((data: T) => string);
  titleIcon?: string;
  actions?: any;
  handleClick: (data: T) => void;
  isDisabled?: (data: T) => boolean;
  isShown?: boolean | ((data: T) => boolean);
  showConfirmationModal?: boolean;
  title?: string;
  viewBox?: string;
  isChecked?: (data: T) => boolean;
}

type ColorConfig = {
  name: string;
  icon: React.ElementType;
  color: string;
  opacity: string;
};

const colors: ColorConfig[] = [
  {
    name: "edit",
    icon: HomeIcon,
    color: "primary",
    opacity: "500",
  },
  {
    name: "activate",
    icon: Dot,
    color: "primary",
    opacity: "500",
  },
  {
    name: "deactivate",
    icon: ArrowDown,
    color: "primary",
    opacity: "500",
  },
  {
    name: "pay",
    icon: BiMoney,
    color: "secondary",
    opacity: "500",
  },
];

const getActionProps = (type: string): ColorConfig | undefined => {
  return colors.find(
    (color) => type.toLowerCase() === color.name.toLowerCase()
  );
};

const ActionButtons = memo(
  <T,>({ actions, data }: { actions: ActionProps<T>[]; data: T }) => {
    const theme = useTheme();

    const getFillColor = (action: ActionProps<T>): string => {
      const selectedAction = colors.find((color) => color.name === action.name);

      if (selectedAction) {
        const fillColor = selectedAction.color;
        const opacity = selectedAction.opacity;

        return theme.colors[fillColor]?.[opacity] || "primary.500";
      }

      return "primary.500";
    };

    const getIcon = (action: ActionProps<T>) => {
      const actionName =
        typeof action.name === "string" ? action.name : action.name(data);
      const IconComponent = getActionProps(actionName)?.icon;

      return IconComponent ? (
        <Icon as={IconComponent} boxSize={5} color={getFillColor(action)} />
      ) : (
        <Icon as={ArrowDownIcon} boxSize={5} color={getFillColor(action)} />
      );
    };

    return (
      <Flex gap={2} alignItems="center">
        {actions.map(({ isShown = true, ...action }, index) => {
          const shouldShow =
            isShown === true ||
            (typeof isShown === "function" && isShown(data));
          if (!shouldShow) return null;

          return (
            <Tooltip
              key={`tooltip-${index}`}
              content={
                action.title
                  ? `ACTION_BUTTON.${action.title.toUpperCase()}`
                  : typeof action.name === "string"
                    ? `ACTION_BUTTON.${action.name.toUpperCase()}`
                    : `ACTION_BUTTON.${action.name(data).toUpperCase()}`
              }
            >
              <IconButton
                position="unset"
                borderRadius="7px"
                aria-label={
                  typeof action.name === "string"
                    ? action.name
                    : action.name(data)
                }
                width="42px"
                minW="42px"
                height="42px"
                bg="transparent"
                _hover={{ backgroundColor: "none" }}
                onClick={() => action.handleClick(data)}
                disabled={action.isDisabled?.(data) || false}
              >
                {getIcon(action)}
              </IconButton>
            </Tooltip>
          );
        })}
      </Flex>
    );
  }
);

ActionButtons.displayName = "ActionButtons";

export default ActionButtons;
