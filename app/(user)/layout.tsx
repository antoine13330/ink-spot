import { NavigationBar } from "@/components/layout/navigation-bar";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
      <NavigationBar />

    </div>
  )
}