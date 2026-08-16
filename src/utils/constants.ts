import {
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  type LucideIcon,
} from "lucide-react";

interface SidebarNavItemProps {
  title: string;
  icon: LucideIcon;
  url: string;
}

interface SidebarNavProps {
  title: string;
  items: SidebarNavItemProps[];
}

export const menuItems: SidebarNavProps[] = [
  {
    title: "Main",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  },
];

export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 5,
  MAX_PAGE_SIZE: 100,
  MIN_PAGE_SIZE: 1,
};
