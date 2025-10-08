import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const EMAILS: Record<string,string> = {
  ADMIN: "admin@school.edu",
  TEACHER: "teacher@school.edu",
  STUDENT: "student@school.edu",
  PARENT: "parent@school.edu",
};

const DEST: Record<string,string> = {
  ADMIN: "/admin", TEACHER: "/teacher", STUDENT: "/student", PARENT: "/parent",
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const role = (url.searchParams.get("role") || "TEACHER").toUpperCase();
  const email = EMAILS[role] || EMAILS.TEACHER;

  // demo-only session cookie
  cookies().set("eduforge_demo_user", JSON.stringify({ email, role }), {
    httpOnly: true, sameSite: "lax", maxAge: 60 * 30, path: "/",
  });

  return NextResponse.redirect(new URL(DEST[role] || "/teacher", req.url));
}
