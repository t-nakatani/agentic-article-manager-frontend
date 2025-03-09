"use client"

import { useState } from "react"
import { Header } from "@/components/layout/Header"
import { DevSidebar } from "./components/dev-sidebar"
import { DevContent } from "./components/dev-content"
import { SidebarProvider } from "@/components/ui/sidebar"
import { devSidebarItems } from "./config/sidebar-items"

export default function DevPage() {
  const [activeItem, setActiveItem] = useState("general")

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <SidebarProvider>
          <DevSidebar 
            activeItem={activeItem} 
            onItemChange={setActiveItem} 
            items={devSidebarItems} 
          />
          <DevContent activeItem={activeItem} />
        </SidebarProvider>
      </div>
    </div>
  )
}

