"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Users, BookOpen, GraduationCap, FileText, Settings, ChartBar as BarChart3, Calendar, SquareCheck as CheckSquare, MessageSquare, Chrome as Home } from "lucide-react";

interface SidebarProps {
  role: string;
}

const roleMenus = {
  ADMIN: [
    { label: "Dashboard", href: "/admin", icon: Home },
    { label: "Organization", href: "/admin/organization", icon: Settings },
    { label: "Groups", href: "/admin/groups", icon: Users },
    { label: "People", href: "/admin/people", icon: GraduationCap },
    { label: "Subjects", href: "/admin/subjects", icon: BookOpen },
    { label: "Reports", href: "/admin/reports", icon: BarChart3 },
  ],
  TEACHER: [
    { label: "Dashboard", href: "/teacher", icon: Home },
    { label: "My Groups", href: "/teacher/groups", icon: Users },
    { label: "Subjects", href: "/teacher/subjects", icon: BookOpen },
    { label: "Library", href: "/teacher/library", icon: FileText },
    { label: "Assignments", href: "/teacher/assignments", icon: CheckSquare },
    { label: "Grades", href: "/teacher/grades", icon: BarChart3 },
  ],
  STUDENT: [
    { label: "Today", href: "/student", icon: Home },
    { label: "Assigned", href: "/student/assigned", icon: CheckSquare },
    { label: "Submissions", href: "/student/submissions", icon: FileText },
    { label: "Scores", href: "/student/scores", icon: BarChart3 },
  ],
  PARENT: [
    { label: "Children", href: "/parent", icon: Users },
    { label: "Weekly Digest", href: "/parent/digest", icon: Calendar },
    { label: "Alerts", href: "/parent/alerts", icon: MessageSquare },
    { label: "Messages", href: "/parent/messages", icon: MessageSquare },
  ],
};

export function Sidebar({ role }: SidebarProps) {
  const pathname = usePathname();
  const menu = roleMenus[role as keyof typeof roleMenus] || [];

  return (
    <div className="w-64 bg-gray-50 border-r border-gray-200 h-screen">
      <nav className="p-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  isActive && "bg-blue-600 hover:bg-blue-700"
                )}
              >
                <Icon className="h-4 w-4 mr-2" />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}