import Image from "next/image"

export function AppLogo() {
  return (
    <div className="flex items-center gap-2 pl-6">
      <Image src="/soi_blue.svg" alt="Soi Logo" width={70} height={40} />
    </div>
  )
}
