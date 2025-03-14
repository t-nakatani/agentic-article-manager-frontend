import Image from "next/image"

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/icon.png" alt="Soi Logo" width={30} height={30} />
      <div className="flex items-center gap-2">
        <span className="text-3xl font-bold text-black dark:text-white">Soi</span>
        <span className="text-sm text-foreground">Agentによるwebページ管理</span>
      </div>
    </div>
  )
}
