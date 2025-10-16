import { Desktop } from "@/components/desktop/desktop"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function DesktopPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return <Desktop user={user} />
}
