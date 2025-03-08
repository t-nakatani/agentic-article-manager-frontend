import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { LucideIcon } from "lucide-react"

// メニュー項目の型定義
export interface DevSidebarItem {
  id: string
  label: string
  icon: LucideIcon
  tooltip: string
}

interface DevSidebarProps {
  activeItem: string
  onItemChange: (item: string) => void
  items: DevSidebarItem[] // メニュー項目を外部から注入
}

export function DevSidebar({ activeItem, onItemChange, items }: DevSidebarProps) {
  return (
    <div className="w-64 border-r">
      <SidebarContent className="py-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.id}>
              <SidebarMenuButton
                isActive={activeItem === item.id}
                onClick={() => onItemChange(item.id)}
                tooltip={item.tooltip}
              >
                <item.icon className="mr-2" />
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </div>
  )
} 