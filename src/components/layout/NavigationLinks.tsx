import Link from "next/link"
import { Download, HelpCircle, Beaker, BarChart } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

interface NavigationLinkProps {
  href: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const NavigationLink = ({ href, icon, children }: NavigationLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
        isActive 
          ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" 
          : "hover:bg-indigo-50/50 hover:text-indigo-600 dark:hover:bg-indigo-900/20 dark:hover:text-indigo-400"
      )}
    >
      {icon && <span className="mr-2">{icon}</span>}
      <span className="hidden md:inline">{children}</span>
    </Link>
  );
};

interface NavigationLinksProps {
  variant?: "horizontal" | "vertical";
  className?: string;
}

export function NavigationLinks({ variant = "horizontal", className = "" }: NavigationLinksProps) {
  const baseClass = variant === "horizontal" 
    ? "flex items-center space-x-1" 
    : "flex flex-col space-y-1";
    
  return (
    <div className={cn(baseClass, className)}>
      <NavigationLink href="/">
        Home
      </NavigationLink>
      
      <NavigationLink 
        href="/weekly-review" 
        icon={<BarChart className="h-4 w-4" />}
      >
        週間振り返り
      </NavigationLink>
      
      <NavigationLink 
        href="/extension" 
        icon={<Download className="h-4 w-4" />}
      >
        拡張機能
      </NavigationLink>
      
      <NavigationLink 
        href="/help" 
        icon={<HelpCircle className="h-4 w-4" />}
      >
        ヘルプ
      </NavigationLink>
      
      <NavigationLink 
        href="/dev" 
        icon={<Beaker className="h-4 w-4" />}
      >
        ベータ機能
      </NavigationLink>
    </div>
  )
} 