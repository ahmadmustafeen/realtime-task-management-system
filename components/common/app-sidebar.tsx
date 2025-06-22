"use client";

import { useRouter } from "next/navigation";
import { Home, LogOut, User } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../../components/ui/sidebar";
import { ROUTES } from "../../lib/constants";
import { useAuth } from "../../context/AuthContext";
import { useTasks } from "../../context/TaskContext";
import { useUsers } from "../../context/UsersContext";

export function AppSidebar() {
  const router = useRouter();
  const { resetUser } = useAuth();
  const { resetTasks } = useTasks();
  const { resetUsers } = useUsers();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("USER");
    document.cookie = "token=; path=/; max-age=0";
    resetUser();
    resetTasks();
    resetUsers();
    router.push(ROUTES.LOGIN);
  };

  const items = [
    {
      title: "Home",
      url: ROUTES.DASHBOARD,
      icon: Home,
      action: () => router.push(ROUTES.DASHBOARD),
    },
    {
      title: "Profile",
      url: ROUTES.PROFILE,
      icon: User,
      action: () => router.push(ROUTES.PROFILE),
    },
    {
      title: "Logout",
      url: "#",
      icon: LogOut,
      action: handleLogout,
    },
  ];

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>RealTime Task Manager</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <button
                      onClick={item.action}
                      className="flex items-center w-full gap-2 text-left"
                    >
                      <item.icon />
                      <span className="text-base">{item.title}</span>
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
