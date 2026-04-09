"use client";

import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  CalendarDays,
  ArrowRight,
  Plus,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency } from "@/lib/utils";

// Demo data
const stats = {
  todaySales: 485250, // $4,852.50
  todaySalesChange: 12.5,
  weekSales: 892300,
  weekSalesChange: 8.2,
  activeProducts: 24,
  lowStockItems: 3,
};

const recentSales = [
  { id: 1, product: "Organic Bananas", quantity: 12.5, unit: "lb", amount: 4375, time: "2 min ago" },
  { id: 2, product: "Fresh Strawberries", quantity: 8, unit: "pint", amount: 5600, time: "5 min ago" },
  { id: 3, product: "Heirloom Tomatoes", quantity: 6, unit: "lb", amount: 3600, time: "8 min ago" },
  { id: 4, product: "Baby Spinach", quantity: 5, unit: "bunch", amount: 1500, time: "12 min ago" },
];

const topProducts = [
  { name: "Organic Bananas", sold: 145, revenue: 50750, trend: "up" },
  { name: "Fresh Strawberries", sold: 89, revenue: 62300, trend: "up" },
  { name: "Heirloom Tomatoes", sold: 67, revenue: 40200, trend: "down" },
];

const upcomingMarketDays = [
  { date: "2024-03-16", day: "Saturday", status: "upcoming" as const },
  { date: "2024-03-23", day: "Saturday", status: "upcoming" as const },
  { date: "2024-03-30", day: "Saturday", status: "upcoming" as const },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Good morning, Green Valley</h1>
          <p className="text-gray-500">Here&apos;s what&apos;s happening at today&apos;s market</p>
        </div>
        <Link href="/market-day/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Start Market Day
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Sales */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <Badge variant={stats.todaySalesChange >= 0 ? "success" : "error"}>
                {stats.todaySalesChange >= 0 ? "+" : ""}{stats.todaySalesChange}%
              </Badge>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-800">
              {formatCurrency(stats.todaySales)}
            </p>
            <p className="text-sm text-gray-500">Today&apos;s Sales</p>
          </CardContent>
        </Card>

        {/* Week Sales */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <Badge variant={stats.weekSalesChange >= 0 ? "success" : "error"}>
                {stats.weekSalesChange >= 0 ? "+" : ""}{stats.weekSalesChange}%
              </Badge>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-800">
              {formatCurrency(stats.weekSales)}
            </p>
            <p className="text-sm text-gray-500">This Week</p>
          </CardContent>
        </Card>

        {/* Active Products */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              {stats.lowStockItems > 0 && (
                <Badge variant="warning">{stats.lowStockItems} low</Badge>
              )}
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-800">{stats.activeProducts}</p>
            <p className="text-sm text-gray-500">Active Products</p>
          </CardContent>
        </Card>

        {/* Next Market */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-orange-100 rounded-lg">
                <CalendarDays className="w-5 h-5 text-orange-600" />
              </div>
              <Badge variant="info">In 2 days</Badge>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-800">Saturday</p>
            <p className="text-sm text-gray-500">Next Market Day</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Sales */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <CardTitle>Recent Sales</CardTitle>
            <Link href="/sales" className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <Package className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{sale.product}</p>
                      <p className="text-sm text-gray-500">
                        {sale.quantity} {sale.unit} • {sale.time}
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">{formatCurrency(sale.amount)}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Products Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map((product, index) => (
                <div key={product.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-bold text-gray-300">#{index + 1}</span>
                    <div>
                      <p className="font-medium text-gray-800">{product.name}</p>
                      <p className="text-sm text-gray-500">{product.sold} sold</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-800">
                      {formatCurrency(product.revenue)}
                    </span>
                    {product.trend === "up" ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Market Days */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Upcoming Market Days</CardTitle>
          <Link href="/market-day" className="text-sm text-green-600 hover:text-green-700 flex items-center gap-1">
            View calendar <ArrowRight className="w-3 h-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingMarketDays.map((day) => (
              <div
                key={day.date}
                className="p-4 rounded-xl border border-gray-100 hover:border-green-200 hover:bg-green-50/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex flex-col items-center justify-center">
                    <span className="text-xs font-medium text-green-600">
                      {new Date(day.date).toLocaleDateString("en-US", { month: "short" })}
                    </span>
                    <span className="text-lg font-bold text-green-700">
                      {new Date(day.date).getDate()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{day.day}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(day.date).toLocaleDateString("en-US", { weekday: "long", year: "numeric" })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
