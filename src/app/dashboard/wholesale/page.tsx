"use client";

import { useState } from "react";
import {
  Plus,
  Package,
  Truck,
  DollarSign,
  Calendar,
  ArrowRight,
  X,
  Check,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency, formatDate } from "@/lib/utils";

const wholesaleOrders = [
  {
    id: "1",
    customerName: "Whole Foods Market",
    customerType: "grocery" as const,
    orderDate: "2024-03-08",
    items: [
      { name: "Organic Bananas", quantity: 50, unit: "lb", priceCents: 280 },
      { name: "Fresh Strawberries", quantity: 30, unit: "pint", priceCents: 560 },
    ],
    totalCents: 30800,
    status: "delivered" as const,
  },
  {
    id: "2",
    customerName: "Local Bistro",
    customerType: "restaurant" as const,
    orderDate: "2024-03-05",
    items: [
      { name: "Baby Spinach", quantity: 20, unit: "bunch", priceCents: 240 },
      { name: "Heirloom Tomatoes", quantity: 15, unit: "lb", priceCents: 480 },
    ],
    totalCents: 9600,
    status: "paid" as const,
  },
  {
    id: "3",
    customerName: "Corner Deli",
    customerType: "restaurant" as const,
    orderDate: "2024-03-01",
    items: [
      { name: "Organic Apples", quantity: 25, unit: "lb", priceCents: 360 },
    ],
    totalCents: 9000,
    status: "delivered" as const,
  },
];

export default function WholesalePage() {
  const [showNewOrderModal, setShowNewOrderModal] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Wholesale</h1>
          <p className="text-gray-500">Manage off-market day sales to grocery stores and restaurants</p>
        </div>
        <Button onClick={() => setShowNewOrderModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          New Order
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">
                  {formatCurrency(wholesaleOrders.reduce((sum, o) => sum + o.totalCents, 0))}
                </p>
                <p className="text-sm text-gray-500">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">3</p>
                <p className="text-sm text-gray-500">Active Accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">8</p>
                <p className="text-sm text-gray-500">Orders YTD</p>
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
                    wholesaleOrders.reduce((sum, o) => sum + o.totalCents, 0) / 4
                  )}
                </p>
                <p className="text-sm text-gray-500">Avg per Order</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Accounts */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Accounts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { name: "Whole Foods Market", type: "grocery", orders: 5, revenue: 154000 },
              { name: "Local Bistro", type: "restaurant", orders: 2, revenue: 19200 },
              { name: "Corner Deli", type: "restaurant", orders: 1, revenue: 9000 },
            ].map((customer) => (
              <div
                key={customer.name}
                className="p-4 border border-gray-100 rounded-xl hover:border-green-200 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    {customer.type === "grocery" ? (
                      <Package className="w-5 h-5 text-green-600" />
                    ) : (
                      <Truck className="w-5 h-5 text-blue-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{customer.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{customer.type}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{customer.orders} orders</span>
                  <span className="font-semibold text-gray-800">
                    {formatCurrency(customer.revenue)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orders */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Recent Orders</CardTitle>
          <Button variant="ghost" size="sm" className="gap-1">
            View All <ArrowRight className="w-3 h-3" />
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {wholesaleOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                    {order.customerType === "grocery" ? (
                      <Package className="w-6 h-6 text-gray-400" />
                    ) : (
                      <Truck className="w-6 h-6 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{order.customerName}</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.orderDate)} • {order.items.length} items
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <Badge
                    variant={
                      order.status === "delivered"
                        ? "success"
                        : order.status === "paid"
                        ? "info"
                        : "warning"
                    }
                  >
                    {order.status}
                  </Badge>
                  <p className="font-bold text-gray-800">{formatCurrency(order.totalCents)}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Order Modal */}
      <Modal
        isOpen={showNewOrderModal}
        onClose={() => setShowNewOrderModal(false)}
        title="New Wholesale Order"
        size="lg"
      >
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Customer Name" placeholder="Whole Foods Market" />
            <Select
              label="Customer Type"
              options={[
                { value: "grocery", label: "Grocery Store" },
                { value: "restaurant", label: "Restaurant" },
                { value: "individual", label: "Individual" },
              ]}
            />
          </div>

          <Input label="Order Date" type="date" />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Items</label>
            <div className="space-y-2">
              {[
                { name: "Organic Bananas", price: 280 },
                { name: "Fresh Strawberries", price: 560 },
                { name: "Baby Spinach", price: 240 },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-green-500"
                  />
                  <span className="flex-1 text-gray-800">{item.name}</span>
                  <span className="text-gray-500">{formatCurrency(item.price)}/lb</span>
                  <input
                    type="number"
                    placeholder="Qty"
                    className="w-20 px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button variant="secondary" onClick={() => setShowNewOrderModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button className="flex-1">Create Order</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
