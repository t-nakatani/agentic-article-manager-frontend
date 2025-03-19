import Image from "next/image"

export function AppLogo() {
  return (
    <div className="flex items-center gap-2">
      <Image src="/soi.svg" alt="Soi Logo" width={90} height={40} />
    </div>
  )
}
