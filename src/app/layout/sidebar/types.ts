import React from "react";

export interface IMobileSidebar {
  isOpen: boolean;
  onClose: () => void;
  handleLogout: () => void;
}
export interface ILink {
  icon: React.ComponentType<any>;
  label: string;
  path?: string;
  menuKey?: string;
  subItems?: subItems;
  key?: string;
  viewBox?: string;
}

export type subItems = SimpleSubItem[];

export interface SideBarProps {
  onShowSidebar: () => void;
  sideToggled: boolean;
}

export interface SimpleSubItem {
  label: string;
  path: string;
  icon?: React.ComponentType<any>;
}

export interface IRenderLinks {
  sideToggled: boolean;
  links: ILink[];
  onShowSidebar: () => void;
}

export interface ActiveMenuProps {
  subLink: SimpleSubItem;
  isActiveLink: (link: string) => boolean;
  sideToggled: boolean;
  onShowSidebar: any;
}
