import { HStack, IconButton } from "@chakra-ui/react";
import { FaTrashAlt } from "react-icons/fa";
import { IoNewspaperOutline } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import { BaseButton } from "../button";
import { ActionButtonsProps } from "./interface/data-types";
import { TbRestore } from "react-icons/tb";

export const ActionButtons = <T,>({ actions, item }: ActionButtonsProps<T>) => {
  return (
    <HStack gap={2}>
      {actions.map((action, index) => {
        const isShown =
          typeof action.isShown === "function"
            ? action.isShown(item)
            : action.isShown !== false;
        const isDisabled = action.isDisabled ? action.isDisabled(item) : false;
        const label =
          typeof action.name === "function" ? action.name(item) : action.name;

        if (!isShown) return null;

        switch (label) {
          case "delete":
            return (
              <IconButton
                key={index}
                aria-label="Supprimer"
                colorPalette="red"
                size="sm"
                onClick={() => action.handleClick(item)}
                disabled={isDisabled}
              >
                <FaTrashAlt />
              </IconButton>
            );
          case "edit":
            return (
              <IconButton
                key={index}
                aria-label="Modifier"
                colorPalette="blue"
                size="sm"
                onClick={() => action.handleClick(item)}
                disabled={isDisabled}
              >
                <MdEdit />
              </IconButton>
            );
          case "view":
            return (
              <IconButton
                key={index}
                aria-label="Voir"
                colorPalette="green"
                size="sm"
                onClick={() => action.handleClick(item)}
                disabled={isDisabled}
              >
                <IoNewspaperOutline />
              </IconButton>
            );
          case "restore":
            return (
              <IconButton
                key={index}
                aria-label="restore"
                colorPalette="blue"
                size="sm"
                onClick={() => action.handleClick(item)}
                disabled={isDisabled}
              >
                <TbRestore />
              </IconButton>
            );
          default:
            return (
              <BaseButton
                key={index}
                size="sm"
                onClick={() => action.handleClick(item)}
                disabled={isDisabled}
              >
                {label}
              </BaseButton>
            );
        }
      })}
    </HStack>
  );
};
