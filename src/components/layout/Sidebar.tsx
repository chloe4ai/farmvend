"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  CalendarDays,
  TrendingUp,
  ShoppingCart,
  DollarSign,
  Settings,
  ChevronRight,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Market Days", href: "/market-day", icon: CalendarDays },
  { name: "Products", href: "/products", icon: Package },
  { name: "Sales", href: "/sales", icon: ShoppingCart },
  { name: "Pricing", href: "/pricing", icon: TrendingUp },
  { name: "Wholesale", href: "/wholesale", icon: DollarSign },
  { name: "Analytics", href: "/analytics", icon: TrendingUp },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-64 bg-white/80 backdrop-blur-md border-r border-gray-100">
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="w-5 h-5 text-white"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
          </div>
          <span className="font-semibold text-gray-800">FarmVend</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <Icon className={cn("w-5 h-5", isActive ? "text-green-600" : "text-gray-400")} />
              {item.name}
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto text-green-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Market Day Status */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className="p-4 rounded-xl bg-green-50 border border-green-100">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-sm font-medium text-green-800">
              Market Day Active
            </span>
          </div>
          <p className="mt-1 text-xs text-green-600">
            Saturday Market - 24 items in stock
          </p>
        </div>
      </div>
    </aside>
  );
}
