import Nav from "@/components/Nav"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Vers le Canada",
  description: "Blog personnel sur mon immigration au Canada",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  )
}
