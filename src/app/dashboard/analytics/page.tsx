"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Select } from "@/components/ui/Input";
import { formatCurrency } from "@/lib/utils";

// Demo data
const monthlyData = {
  totalRevenue: 1652750,
  revenueChange: 12.5,
  totalUnits: 519,
  unitsChange: 8.2,
  avgDailyRevenue: 413187,
  avgTransaction: 1525,
};

const topProducts = [
  { name: "Organic Bananas", sold: 145, revenue: 50750, trend: 15.2, lastWeek: 126 },
  { name: "Fresh Strawberries", sold: 89, revenue: 62300, trend: -3.1, lastWeek: 92 },
  { name: "Heirloom Tomatoes", sold: 67, revenue: 40200, trend: 22.5, lastWeek: 55 },
  { name: "Baby Spinach", sold: 54, revenue: 16200, trend: 8.0, lastWeek: 50 },
  { name: "Organic Apples", sold: 48, revenue: 21600, trend: -5.3, lastWeek: 51 },
];

const weeklyRevenue = [
  { day: "Mon", revenue: 0 },
  { day: "Tue", revenue: 0 },
  { day: "Wed", revenue: 0 },
  { day: "Thu", revenue: 0 },
  { day: "Fri", revenue: 0 },
  { day: "Sat", revenue: 485250 },
  { day: "Sun", revenue: 0 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("this-month");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-500">Insights to help you grow your business</p>
        </div>
        <div className="flex items-center gap-3">
          <Select
            options={[
              { value: "this-week", label: "This Week" },
              { value: "this-month", label: "This Month" },
              { value: "last-month", label: "Last Month" },
              { value: "last-3-months", label: "Last 3 Months" },
            ]}
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="w-40"
          />
          <Button variant="secondary">Export Report</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-medium">+12.5%</span>
              </div>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-800">
              {formatCurrency(monthlyData.totalRevenue)}
            </p>
            <p className="text-sm text-gray-500">Total Revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-green-600">
                <ArrowUpRight className="w-4 h-4" />
                <span className="text-sm font-medium">+8.2%</span>
              </div>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-800">
              {monthlyData.totalUnits}
            </p>
            <p className="text-sm text-gray-500">Units Sold</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-purple-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-800">
              {formatCurrency(monthlyData.avgDailyRevenue)}
            </p>
            <p className="text-sm text-gray-500">Avg per Market Day</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Calendar className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="mt-4 text-2xl font-bold text-gray-800">
              {formatCurrency(monthlyData.avgTransaction)}
            </p>
            <p className="text-sm text-gray-500">Avg Transaction</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 flex items-end justify-between gap-2">
              {weeklyRevenue.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div
                    className={`w-full rounded-t-lg transition-all ${
                      day.revenue > 0 ? "bg-green-500" : "bg-gray-100"
                    }`}
                    style={{
                      height: `${day.revenue > 0 ? (day.revenue / 500000) * 100 : 10}%`,
                    }}
                  />
                  <span className="text-xs text-gray-400">{day.day}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                <span className="font-medium">Saturday market</span> generated{" "}
                <span className="font-bold">{formatCurrency(485250)}</span> this week
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Insights */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-green-50 rounded-lg border border-green-100">
              <p className="text-sm font-medium text-green-800">Best Day of Week</p>
              <p className="text-lg font-bold text-green-700">Saturday</p>
              <p className="text-xs text-green-600">Your highest revenue day</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-800">Peak Hours</p>
              <p className="text-lg font-bold text-blue-700">9-11 AM</p>
              <p className="text-xs text-blue-600">Busiest selling period</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
              <p className="text-sm font-medium text-purple-800">Top Category</p>
              <p className="text-lg font-bold text-purple-700">Tropical Fruits</p>
              <p className="text-xs text-purple-600">32% of total sales</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products Table */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Top Products</CardTitle>
          <Button variant="ghost" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">
                    Product
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                    Units Sold
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                    Revenue
                  </th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">
                    vs Last Week
                  </th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={product.name} className="border-b border-gray-50 last:border-0">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold text-gray-300">
                          #{index + 1}
                        </span>
                        <span className="font-medium text-gray-800">{product.name}</span>
                      </div>
                    </td>
                    <td className="text-right py-4 px-4 font-medium text-gray-800">
                      {product.sold}
                    </td>
                    <td className="text-right py-4 px-4 font-bold text-gray-800">
                      {formatCurrency(product.revenue)}
                    </td>
                    <td className="text-right py-4 px-4">
                      <div
                        className={`inline-flex items-center gap-1 ${
                          product.trend >= 0 ? "text-green-600" : "text-red-500"
                        }`}
                      >
                        {product.trend >= 0 ? (
                          <TrendingUp className="w-4 h-4" />
                        ) : (
                          <TrendingDown className="w-4 h-4" />
                        )}
                        <span className="text-sm font-medium">
                          {product.trend >= 0 ? "+" : ""}
                          {product.trend}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-amber-600" />
                </div>
                <span className="font-medium text-amber-800">Growth Opportunity</span>
              </div>
              <p className="text-sm text-amber-700">
                Heirloom Tomatoes show +22.5% growth. Consider increasing stock by 20%.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Package className="w-4 h-4 text-blue-600" />
                </div>
                <span className="font-medium text-blue-800">Inventory Alert</span>
              </div>
              <p className="text-sm text-blue-700">
                Fresh Strawberries demand exceeds supply. Prioritize restocking on Saturdays.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-green-800">Pricing Tip</span>
              </div>
              <p className="text-sm text-green-700">
                Your prices are 7% below Target average. Consider a modest increase.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
