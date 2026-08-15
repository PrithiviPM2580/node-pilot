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
