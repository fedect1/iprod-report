'use client'

import { FilePieChart, BarChart, Home, Settings, ChevronDown, ClipboardList } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

// Importa los componentes Collapsible de shadcn/ui
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible"
import Link from "next/link"
import { usePathname } from "next/navigation"

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Order Managment",
    url: "#",
    icon: ClipboardList,
    subItems: [
      { title: "Overview", url: "/order-managment/orders" },
      { title: "Create Order", url: "/order-managment/create-order/step-1" },
      { title: "Materials", url: "/order-managment/material" },
      { title: "Recipes", url: "/order-managment/recipes" },
    ]
  },
  {
    title: "State",
    url: "#",
    icon: BarChart,
    subItems: [
      { title: "Survey machines", url: "/state/survey-machines" },
      { title: "Machine state", url: "/state/machine-state" },
      { title: "State ext. var.", url: "/state/state-ext-var" },
      { title: "Status Silo", url: "/state/status-silo" },
      { title: "Production State", url: "/state/production-state" },
      { title: "Material", url: "/state/material" },
    ],
  },
  {
    title: "Reports",
    url: "#",
    icon: FilePieChart,
    subItems: [
      { title: "Time Reports", url: "/reports/time-reports" },
      { title: "Reports di ID webMIP", url: "/reports/reports-di-id-webmip" },
      { title: "Trend", url: "/reports/trend" },
      { title: "Report Down Time", url: "/reports/report-down-time" },
      { title: "Thickness Profile", url: "/reports/thickness-profile" },
      { title: "Chronological Report", url: "/reports/chronological-report" },
      { title: "Material", url: "/reports/material" },
      { title: "Silo", url: "/reports/silo" },
    ],
  },
  {
    title: "Administration",
    url: "#",
    icon: Settings,
    subItems: [
      { title: "Shift Book", url: "/administration/shift-book" },
      { title: "Shift Calendar", url: "/administration/shift-calendar" },
      { title: "Order Management AV", url: "/administration/order-management-av" },
    ],
  },
]

export function AppSidebar() {
  const currentPath = usePathname();
  console.log("Current Path:", currentPath); // Para depuración

  return (
    <div className="flex">

    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex flex-row items-center gap-4 h-20 px-4">
          {/* Logo a la izquierda */}
          <Link href="/" className="w-10 h-10 bg-logoColor rounded-md cursor-pointer" />

          {/* Texto a la derecha */}
          <div className="leading-tight">
            <span className="block text-base font-semibold">INNO-PLAST</span>
            <span className="block text-sm text-gray-500">BluPlast</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Iprod - Reports</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => {
                  // Verificamos si el item tiene subItems para usar Collapsible
                  if (item.subItems) {
                    // Determine si alguno de los subItems está activo
                    const isParentActive = item.subItems.some(subItem => currentPath === subItem.url);
                    
                    return (
                      <Collapsible
                        key={item.title}
                        defaultOpen={isParentActive} 
                        className="group/collapsible"
                        >
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton asChild>
                              {/* 
                                Añadimos un contenedor flex para el ícono + texto + flechita. 
                                La flechita (ChevronDown) rotará cuando [data-state=open].
                              */}
                              <div className={`flex items-center space-x-2 w-full cursor-pointer ${isParentActive ? 'text-green-800 font-bold' : 'text-gray-700 hover:text-gray-900'}`}>
                                <item.icon />
                                <span>{item.title}</span>
                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                              </div>
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.subItems.map((subItem) => {
                                const isSubItemActive = currentPath === subItem.url;
                                return (
                                  <SidebarMenuSubItem key={subItem.title}>
                                    <SidebarMenuButton asChild>
                                      <Link href={subItem.url} className={`flex items-center w-full px-4 py-2 cursor-pointer ${isSubItemActive ? 'text-green-800 font-bold' : 'text-gray-700 hover:text-gray-900'}`}>
                                        {subItem.title}
                                      </Link>
                                    </SidebarMenuButton>
                                  </SidebarMenuSubItem>
                                )
                              })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    )
                  } else {
                    // Para items sin submenú
                    const isItemActive = currentPath === item.url;
                    return (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <Link href={item.url} className={`flex items-center space-x-2 w-full px-2 py-2 cursor-pointer ${isItemActive ? 'text-green-800 font-bold' : 'text-gray-700 hover:text-gray-900'}`}>
                            <item.icon />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  }
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
    </div>
  )
}
