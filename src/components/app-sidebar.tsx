"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { menuItems } from "@/utils/constants";
import { CreditCardIcon, LogOutIcon, StarIcon } from "lucide-react";
import { toast } from "./ui/toast";
import { Button } from "./ui/button";

export default function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  function handleSignOut() {
    authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.add({
            type: "success",
            description: "Signed out successfully",
          });
        },
        onError: (ctx) => {
          toast.add({
            type: "error",
            description: ctx.error.message || "Failed to sign out",
          });
        },
      },
    });
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuItem>
          <SidebarMenuButton
            render={
              <Link href="/" prefetch>
                <Image
                  src="/logos/logo.svg"
                  alt="Node Pilot"
                  width={30}
                  height={30}
                />
                <span className="font-semibold text-sm">Node Pilot</span>
              </Link>
            }
          />
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="gap-x-4 h-10 px-4"
                      isActive={
                        item.url === "/"
                          ? pathname === "/"
                          : pathname.startsWith(item.url)
                      }
                      render={
                        <Link href={item.url} prefetch>
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </Link>
                      }
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Upgrade to Pro"
              className="gap-x-4 h-10 px-4"
              onClick={() => {}}
              render={
                <Button>
                  <StarIcon className="size-4" />
                  <span>Upgrade to Pro</span>
                </Button>
              }
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Billing Portal"
              className="gap-x-4 h-10 px-4"
              onClick={() => {}}
              render={
                <Button>
                  <CreditCardIcon className="size-4" />
                  <span>Billing Portal</span>
                </Button>
              }
            />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Sign Out"
              className="gap-x-4 h-10 px-4"
              onClick={handleSignOut}
              render={
                <Button>
                  <LogOutIcon className="size-4" />
                  <span>Sign Out</span>
                </Button>
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
