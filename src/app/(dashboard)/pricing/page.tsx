"use client";

import { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Target,
  AlertCircle,
  Check,
  Edit2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/lib/utils";

const products = [
  {
    id: "1",
    name: "Organic Bananas",
    currentPrice: 350,
    targetPrice: 324,
    competitorPrice: 349,
    strategy: "competitor_minus_pct",
    isSpecialty: false,
  },
  {
    id: "2",
    name: "Fresh Strawberries",
    currentPrice: 700,
    targetPrice: 648,
    competitorPrice: 699,
    strategy: "competitor_minus_pct",
    isSpecialty: false,
  },
  {
    id: "3",
    name: "Heirloom Tomatoes",
    currentPrice: 600,
    targetPrice: null,
    competitorPrice: null,
    strategy: "specialty_premium",
    isSpecialty: true,
  },
];

export default function PricingPage() {
  const [showRuleModal, setShowRuleModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<(typeof products)[0] | null>(null);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Pricing</h1>
          <p className="text-gray-500">Set intelligent pricing rules to stay competitive</p>
        </div>
        <Button variant="secondary" className="gap-2">
          <Target className="w-4 h-4" />
          Run Price Audit
        </Button>
      </div>

      {/* Pricing Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">7%</p>
                <p className="text-sm text-gray-500">Avg. Below Competitors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">18</p>
                <p className="text-sm text-gray-500">Products with Auto-Pricing</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">3</p>
                <p className="text-sm text-gray-500">Specialty Items</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Default Pricing Rules */}
      <Card>
        <CardHeader>
          <CardTitle>Default Pricing Rules</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="p-4 bg-gray-50 rounded-xl">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 mb-1">Competitor Discount</p>
                <p className="text-2xl font-bold text-gray-800">7%</p>
                <p className="text-xs text-gray-400">below Target/Whole Foods</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Specialty Markup</p>
                <p className="text-2xl font-bold text-gray-800">25%</p>
                <p className="text-xs text-gray-400">above competitor price</p>
              </div>
            </div>
          </div>
          <Button variant="secondary">Edit Default Rules</Button>
        </CardContent>
      </Card>

      {/* Product Pricing */}
      <Card>
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Product Pricing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-green-200 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                    {product.isSpecialty ? (
                      <span className="text-xl">✨</span>
                    ) : (
                      <span className="text-xl">🍌</span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      {product.isSpecialty && (
                        <Badge variant="specialty" className="text-xs">Specialty</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">
                      {product.strategy === "competitor_minus_pct"
                        ? "Auto-priced: 7% below competitor"
                        : "Premium specialty pricing"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  {product.competitorPrice && (
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Competitor</p>
                      <p className="font-medium text-gray-500">
                        {formatCurrency(product.competitorPrice)}
                      </p>
                    </div>
                  )}
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Your Price</p>
                    <p className="text-lg font-bold text-green-600">
                      {formatCurrency(product.currentPrice)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedProduct(product);
                      setShowRuleModal(true);
                    }}
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Price Sources */}
      <Card>
        <CardHeader>
          <CardTitle>Competitor Price Sources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { name: "Target", lastUpdated: "2 hours ago", products: 18 },
            { name: "Whole Foods", lastUpdated: "2 hours ago", products: 15 },
            { name: "Trader Joe's", lastUpdated: "1 day ago", products: 12 },
          ].map((source) => (
            <div
              key={source.name}
              className="flex items-center justify-between p-4 border border-gray-100 rounded-xl"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                  {source.name.charAt(0)}
                </div>
                <div>
                  <p className="font-medium text-gray-800">{source.name}</p>
                  <p className="text-sm text-gray-500">
                    Updated {source.lastUpdated} • {source.products} products
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">Connected</span>
              </div>
            </div>
          ))}
          <Button variant="secondary" className="w-full">
            Add Price Source
          </Button>
        </CardContent>
      </Card>

      {/* Edit Pricing Rule Modal */}
      <Modal
        isOpen={showRuleModal}
        onClose={() => {
          setShowRuleModal(false);
          setSelectedProduct(null);
        }}
        title={`Edit Pricing: ${selectedProduct?.name}`}
        size="md"
      >
        <div className="space-y-5">
          <Select
            label="Pricing Strategy"
            options={[
              { value: "competitor_minus_pct", label: "Below Competitor (-7%)" },
              { value: "specialty_premium", label: "Specialty Premium (+25%)" },
              { value: "fixed", label: "Fixed Price" },
            ]}
            defaultValue={selectedProduct?.strategy}
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Min Price (cents)"
              type="number"
              placeholder="200"
              hint="Optional floor price"
            />
            <Input
              label="Max Price (cents)"
              type="number"
              placeholder="1000"
              hint="Optional ceiling price"
            />
          </div>

          <div className="p-4 bg-green-50 rounded-xl">
            <p className="text-sm text-green-800">
              <span className="font-medium">Suggested price:</span>{" "}
              {selectedProduct?.competitorPrice
                ? formatCurrency(selectedProduct.competitorPrice * 0.93)
                : "N/A"}
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => setShowRuleModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button className="flex-1">Save Rule</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
