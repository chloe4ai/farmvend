"use client";

import Link from "next/link";
import { Plus, Calendar, TrendingUp, DollarSign, Package, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";

// Demo data
const marketDays = [
  {
    id: "1",
    date: "2024-03-09",
    dayType: "market" as const,
    status: "completed" as const,
    location: "Downtown Farmers Market",
    totalSales: 485250,
    totalUnits: 156,
    openingInventory: 24,
    closingInventory: 8,
    topProduct: "Organic Bananas",
  },
  {
    id: "2",
    date: "2024-03-02",
    dayType: "market" as const,
    status: "completed" as const,
    location: "Downtown Farmers Market",
    totalSales: 412800,
    totalUnits: 134,
    openingInventory: 22,
    closingInventory: 5,
    topProduct: "Fresh Strawberries",
  },
  {
    id: "3",
    date: "2024-02-24",
    dayType: "market" as const,
    status: "completed" as const,
    location: "Downtown Farmers Market",
    totalSales: 398500,
    totalUnits: 121,
    openingInventory: 20,
    closingInventory: 3,
    topProduct: "Heirloom Tomatoes",
  },
  {
    id: "4",
    date: "2024-02-17",
    dayType: "market" as const,
    status: "completed" as const,
    location: "Downtown Farmers Market",
    totalSales: 356200,
    totalUnits: 108,
    openingInventory: 18,
    closingInventory: 2,
    topProduct: "Baby Spinach",
  },
];

export default function MarketDayListPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Market Days</h1>
          <p className="text-gray-500">Track your sales and inventory for each market</p>
        </div>
        <Link href="/market-day/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Start Market Day
          </Button>
        </Link>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(marketDays.reduce((sum, d) => sum + d.totalSales, 0))}
                </p>
                <p className="text-sm text-gray-500">Last 4 Markets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {marketDays.reduce((sum, d) => sum + d.totalUnits, 0)}
                </p>
                <p className="text-sm text-gray-500">Units Sold</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">4</p>
                <p className="text-sm text-gray-500">Markets This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(
                    marketDays.reduce((sum, d) => sum + d.totalSales, 0) /
                    marketDays.length
                  )}
                </p>
                <p className="text-sm text-gray-500">Avg per Market</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Days List */}
      <div className="space-y-4">
        {marketDays.map((day) => (
          <Link key={day.id} href={`/market-day/${day.id}`}>
            <Card hover className="group">
              <CardContent className="py-4">
                <div className="flex items-center justify-between">
                  {/* Left side - Date and location */}
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-green-50 border border-green-100 flex flex-col items-center justify-center">
                      <span className="text-xs font-medium text-green-600 uppercase">
                        {new Date(day.date).toLocaleDateString("en-US", { month: "short" })}
                      </span>
                      <span className="text-2xl font-bold text-green-700">
                        {new Date(day.date).getDate()}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-800">
                          {new Date(day.date).toLocaleDateString("en-US", { weekday: "long" })}
                        </p>
                        <Badge variant="success">Completed</Badge>
                      </div>
                      <p className="text-sm text-gray-500">{day.location}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Top seller: <span className="text-gray-700 font-medium">{day.topProduct}</span>
                      </p>
                    </div>
                  </div>

                  {/* Middle - Inventory */}
                  <div className="hidden md:flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Opening</p>
                      <p className="font-semibold text-gray-800">{day.openingInventory} items</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Units Sold</p>
                      <p className="font-semibold text-green-600">{day.totalUnits} items</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500">Closing</p>
                      <p className="font-semibold text-gray-800">{day.closingInventory} items</p>
                    </div>
                  </div>

                  {/* Right side - Revenue */}
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Total Sales</p>
                      <p className="text-xl font-bold text-gray-800">{formatCurrency(day.totalSales)}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-green-500 transition-colors" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
