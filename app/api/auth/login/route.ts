import { NextResponse } from "next/server";
import { ensureDefaultAdmin, verifyCredentials } from "@/lib/auth";
import { createSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    await ensureDefaultAdmin();

    const body = await request.json();

    const username =
      typeof body.username === "string"
        ? body.username.trim()
        : "";

    const password =
      typeof body.password === "string"
        ? body.password
        : "";

    if (!username || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "نام کاربری و رمز عبور الزامی است.",
        },
        { status: 400 },
      );
    }

    const user = await verifyCredentials(
      username,
      password,
    );

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "نام کاربری یا رمز عبور اشتباه است.",
        },
        { status: 401 },
      );
    }

    await createSession(user.id);

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "خطایی در ورود رخ داد.",
      },
      { status: 500 },
    );
  }
}
