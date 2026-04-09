"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CreditCard,
  Banknote,
  Plus,
  Minus,
  X,
  Camera,
  Check,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/lib/utils";

interface CartItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  priceCents: number;
}

const products = [
  { id: "1", name: "Organic Bananas", priceCents: 350, unit: "lb", stock: 45 },
  { id: "2", name: "Fresh Strawberries", priceCents: 700, unit: "pint", stock: 24 },
  { id: "3", name: "Heirloom Tomatoes", priceCents: 600, unit: "lb", stock: 18 },
  { id: "4", name: "Baby Spinach", priceCents: 300, unit: "bunch", stock: 30 },
  { id: "5", name: "Organic Apples", priceCents: 450, unit: "lb", stock: 36 },
  { id: "6", name: "Fresh Peaches", priceCents: 550, unit: "lb", stock: 12 },
  { id: "7", name: "Sweet Corn", priceCents: 200, unit: "each", stock: 60 },
  { id: "8", name: "Organic Carrots", priceCents: 280, unit: "bunch", stock: 25 },
];

export default function LiveMarketDayPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showEndDayModal, setShowEndDayModal] = useState(false);
  const [salesStats, setSalesStats] = useState({
    totalSales: 485250,
    cashSales: 127500,
    cardSales: 357750,
    transactions: 42,
  });

  const addToCart = (product: typeof products[0]) => {
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          id: product.id,
          name: product.name,
          quantity: 1,
          unit: product.unit,
          priceCents: product.priceCents,
        },
      ]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.quantity * item.priceCents,
    0
  );

  const processPayment = (type: "card" | "cash") => {
    // In production, this would integrate with Square for card payments
    setShowPaymentModal(false);
    // Update stats
    const cartTotal = cart.reduce(
      (sum, item) => sum + item.quantity * item.priceCents,
      0
    );
    setSalesStats((prev) => ({
      ...prev,
      totalSales: prev.totalSales + cartTotal,
      cashSales: type === "cash" ? prev.cashSales + cartTotal : prev.cashSales,
      cardSales: type === "card" ? prev.cardSales + cartTotal : prev.cardSales,
      transactions: prev.transactions + 1,
    }));
    setCart([]);
  };

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <Link href="/market-day">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-gray-800">Saturday Market</h1>
              <Badge variant="success" className="animate-pulse">
                Live
              </Badge>
            </div>
            <p className="text-sm text-gray-500">Downtown Farmers Market</p>
          </div>
        </div>
        <Button variant="secondary" onClick={() => setShowEndDayModal(true)}>
          End Day
        </Button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Product Grid */}
        <div className="flex-1 grid grid-cols-2 lg:grid-cols-4 gap-3 content-start overflow-y-auto">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => addToCart(product)}
              className="p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-200 transition-all text-left group"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                  <span className="text-lg">🍌</span>
                </div>
                {product.stock < 15 && (
                  <Badge variant="warning" className="text-xs">Low</Badge>
                )}
              </div>
              <p className="font-medium text-gray-800 group-hover:text-green-700">
                {product.name}
              </p>
              <p className="text-lg font-bold text-gray-800">
                {formatCurrency(product.priceCents)}
                <span className="text-sm font-normal text-gray-400">/{product.unit}</span>
              </p>
              <p className="text-xs text-gray-400 mt-1">{product.stock} in stock</p>
            </button>
          ))}
        </div>

        {/* Cart Panel */}
        <div className="w-80 flex flex-col bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden">
          {/* Cart Header */}
          <div className="p-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-800">Current Sale</h2>
              <Badge>{cart.length} items</Badge>
            </div>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-6 h-6 text-gray-400" />
                </div>
                <p className="text-gray-500 text-sm">Tap products to add to cart</p>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 text-sm">{item.name}</p>
                    <p className="text-xs text-gray-400">
                      {formatCurrency(item.priceCents)}/{item.unit}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="w-7 h-7 rounded-lg bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
                    >
                      <Plus className="w-3 h-3 text-green-600" />
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors ml-2"
                  >
                    <X className="w-3 h-3 text-gray-400 hover:text-red-500" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50/50 space-y-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>

            {cart.length > 0 ? (
              <Button
                onClick={() => setShowPaymentModal(true)}
                className="w-full"
                size="lg"
              >
                Pay Now
              </Button>
            ) : (
              <Button disabled className="w-full" size="lg">
                Add items to cart
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mt-4 grid grid-cols-4 gap-4">
        <Card className="bg-green-50 border-green-100">
          <CardContent className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Banknote className="w-5 h-5 text-green-600" />
              <span className="text-sm text-gray-600">Cash</span>
            </div>
            <span className="font-bold text-green-700">{formatCurrency(salesStats.cashSales)}</span>
          </CardContent>
        </Card>
        <Card className="bg-blue-50 border-blue-100">
          <CardContent className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-600">Card</span>
            </div>
            <span className="font-bold text-blue-700">{formatCurrency(salesStats.cardSales)}</span>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-100">
          <CardContent className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Transactions</span>
            </div>
            <span className="font-bold text-purple-700">{salesStats.transactions}</span>
          </CardContent>
        </Card>
        <Card className="bg-gray-50 border-gray-100">
          <CardContent className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Total</span>
            </div>
            <span className="font-bold text-gray-800">{formatCurrency(salesStats.totalSales)}</span>
          </CardContent>
        </Card>
      </div>

      {/* Payment Modal */}
      <Modal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        title="Complete Payment"
        size="sm"
      >
        <div className="space-y-6">
          <div className="text-center py-4">
            <p className="text-sm text-gray-500">Amount Due</p>
            <p className="text-4xl font-bold text-gray-800">{formatCurrency(subtotal)}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => processPayment("cash")}
              className="h-20 flex-col gap-2"
            >
              <Banknote className="w-6 h-6" />
              <span>Cash</span>
            </Button>
            <Button
              size="lg"
              onClick={() => processPayment("card")}
              className="h-20 flex-col gap-2"
            >
              <CreditCard className="w-6 h-6" />
              <span>Card</span>
            </Button>
          </div>

          <div className="text-center text-xs text-gray-400">
            <p>Card payments processed via Square</p>
            <p>Fee: 2.6% + $0.10 per transaction</p>
          </div>
        </div>
      </Modal>

      {/* End Day Modal */}
      <Modal
        isOpen={showEndDayModal}
        onClose={() => setShowEndDayModal(false)}
        title="End Market Day"
        size="md"
      >
        <div className="space-y-6">
          <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-800">Ready to close?</p>
              <p className="text-sm text-gray-500 mt-1">
                Make sure you&apos;ve recorded your closing inventory before ending the day.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Total Sales</span>
              <span className="font-bold text-gray-800">{formatCurrency(salesStats.totalSales)}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Cash</span>
              <span className="font-medium text-gray-800">{formatCurrency(salesStats.cashSales)}</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-gray-100">
              <span className="text-gray-500">Card</span>
              <span className="font-medium text-gray-800">{formatCurrency(salesStats.cardSales)}</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <span className="text-gray-500">Transactions</span>
              <span className="font-medium text-gray-800">{salesStats.transactions}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowEndDayModal(false)} className="flex-1">
              Continue Selling
            </Button>
            <Link href="/market-day/1" className="flex-1">
              <Button className="w-full gap-2">
                <Check className="w-4 h-4" />
                End & View Report
              </Button>
            </Link>
          </div>
        </div>
      </Modal>
    </div>
  );
}
