// app/api/posts/[programme]/[slug]/route.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { NextResponse } from "next/server"

export async function GET(
  _: Request,
  { params }: { params: { programme: string; slug: string } }
) {
  const filePath = path.join(
    process.cwd(),
    "src",
    "posts",
    params.programme,
    `${params.slug}.md`
  )

  if (!fs.existsSync(filePath)) {
    return NextResponse.json({ error: "Chapitre non trouvé" }, { status: 404 })
  }

  const fileContent = fs.readFileSync(filePath, "utf-8")
  const { data, content } = matter(fileContent)

  return NextResponse.json({
    programme: params.programme,
    slug: params.slug,
    metadata: data,
    content,
  })
}
