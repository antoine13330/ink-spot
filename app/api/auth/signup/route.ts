import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return NextResponse.json({ user: { id: user.id, name: user.name, email: user.email } })
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json({ message: "An error occurred during signup" }, { status: 500 })
  }
}

