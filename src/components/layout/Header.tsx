"use client";

import { Bell, Search, User } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-gray-100 flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products, sales..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-xl transition-colors">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <User className="w-4 h-4 text-green-600" />
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-gray-800">Green Valley Farm</p>
            <p className="text-xs text-gray-500">Premium Vendor</p>
          </div>
        </button>
      </div>
    </header>
  );
}
