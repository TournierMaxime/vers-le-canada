// app/api/posts/route.ts
import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { NextResponse } from "next/server"

export async function GET() {
  const rootDir = path.join(process.cwd(), "src", "posts")
  const programmes = fs.readdirSync(rootDir)

  const allPosts = programmes.map((programme) => {
    const programmeDir = path.join(rootDir, programme)
    const files = fs.readdirSync(programmeDir)

    const posts = files.map((filename) => {
      const slug = filename.replace(".md", "")
      const fileContent = fs.readFileSync(
        path.join(programmeDir, filename),
        "utf-8"
      )
      const { data } = matter(fileContent)

      return {
        slug,
        metadata: data,
      }
    })

    return {
      programme,
      posts,
    }
  })

  return NextResponse.json(allPosts)
}
