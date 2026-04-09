"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Filter,
  Package,
  Edit2,
  Trash2,
  Camera,
  X,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Input, Select } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/lib/utils";

// Demo PLU reference data
const pluDatabase = [
  { code: "4011", name: "Bananas", category: "Tropical Fruits", typicalUnit: "lb" },
  { code: "4065", name: "Peaches", category: "Stone Fruit", typicalUnit: "lb" },
  { code: "3082", name: "Cherries", category: "Stone Fruit", typicalUnit: "lb" },
  { code: "4093", name: "Clementines", category: "Citrus", typicalUnit: "each" },
  { code: "4046", name: "Avocados", category: "Tropical Fruits", typicalUnit: "each" },
  { code: "4225", name: "Apples (Organic)", category: "Pome Fruit", typicalUnit: "lb" },
  { code: "4078", name: "Strawberries", category: "Berries", typicalUnit: "pint" },
  { code: "4083", name: "Baby Spinach", category: "Leafy Greens", typicalUnit: "bunch" },
  { code: "4075", name: "Tomatoes (Heirloom)", category: "Nightshades", typicalUnit: "lb" },
  { code: "4664", name: "Sweet Corn", category: "Vegetables", typicalUnit: "each" },
  { code: "4090", name: "Honeycrisp Apples", category: "Pome Fruit", typicalUnit: "lb" },
  { code: "4055", name: "Grapes (Organic)", category: "Vines", typicalUnit: "lb" },
];

const products = [
  {
    id: "1",
    name: "Organic Bananas",
    pluCode: "4011",
    category: "Tropical Fruits",
    unitType: "lb",
    priceCents: 350,
    isSpecialty: false,
    isActive: true,
    stock: 45,
  },
  {
    id: "2",
    name: "Fresh Strawberries",
    pluCode: "4078",
    category: "Berries",
    unitType: "pint",
    priceCents: 700,
    isSpecialty: false,
    isActive: true,
    stock: 24,
  },
  {
    id: "3",
    name: "Heirloom Tomatoes",
    pluCode: "4075",
    category: "Nightshades",
    unitType: "lb",
    priceCents: 600,
    isSpecialty: true,
    isActive: true,
    stock: 18,
  },
  {
    id: "4",
    name: "Baby Spinach",
    pluCode: "4083",
    category: "Leafy Greens",
    unitType: "bunch",
    priceCents: 300,
    isSpecialty: false,
    isActive: true,
    stock: 30,
  },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPLUModal, setShowPLUModal] = useState(false);
  const [selectedPLU, setSelectedPLU] = useState<(typeof pluDatabase)[0] | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.pluCode.includes(searchQuery);
    const matchesCategory =
      categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handlePLUSelect = (plu: (typeof pluDatabase)[0]) => {
    setSelectedPLU(plu);
    setShowPLUModal(false);
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-gray-500">Manage your product catalog with PLU codes</p>
        </div>
        <Button onClick={() => setShowAddModal(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products or PLU codes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <Select
          options={[
            { value: "all", label: "All Categories" },
            { value: "Tropical Fruits", label: "Tropical Fruits" },
            { value: "Berries", label: "Berries" },
            { value: "Leafy Greens", label: "Leafy Greens" },
            { value: "Nightshades", label: "Nightshades" },
          ]}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-48"
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <Card key={product.id} hover>
            <CardContent className="py-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center">
                    <Package className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-800">{product.name}</p>
                      {product.isSpecialty && (
                        <Badge variant="specialty" className="text-xs">Specialty</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">PLU: {product.pluCode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-50">
                <div>
                  <p className="text-2xl font-bold text-gray-800">
                    {formatCurrency(product.priceCents)}
                    <span className="text-sm font-normal text-gray-400">/{product.unitType}</span>
                  </p>
                  <p className="text-sm text-gray-500">{product.stock} in stock</p>
                </div>
                <Badge variant={product.stock > 10 ? "success" : "warning"}>
                  {product.category}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Product Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setSelectedPLU(null);
        }}
        title={selectedPLU ? "Add Product" : "Add New Product"}
        size="md"
      >
        <form className="space-y-5">
          {selectedPLU ? (
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-800">{selectedPLU.name}</p>
                  <p className="text-sm text-gray-500">
                    PLU: {selectedPLU.code} • {selectedPLU.category}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedPLU(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Product Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
                placeholder="e.g., Organic Bananas"
              />
              <button
                type="button"
                onClick={() => setShowPLUModal(true)}
                className="mt-2 text-sm text-green-600 hover:text-green-700"
              >
                Search PLU codes →
              </button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input label="PLU Code" placeholder="4011" />
            <Select
              label="Unit Type"
              options={[
                { value: "lb", label: "Pound (lb)" },
                { value: "each", label: "Each" },
                { value: "bunch", label: "Bunch" },
                { value: "pint", label: "Pint" },
                { value: "dozen", label: "Dozen" },
              ]}
            />
          </div>

          <Input
            label="Price per Unit (cents)"
            type="number"
            placeholder="350"
            hint="Enter price in cents (e.g., 350 = $3.50)"
          />

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="specialty"
              className="w-4 h-4 rounded border-gray-300 text-green-500 focus:ring-green-500"
            />
            <label htmlFor="specialty" className="text-sm text-gray-700">
              Specialty item (eligible for premium pricing)
            </label>
          </div>

          <div className="pt-2 flex gap-3">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setShowAddModal(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Product
            </Button>
          </div>
        </form>
      </Modal>

      {/* PLU Lookup Modal */}
      <Modal
        isOpen={showPLUModal}
        onClose={() => setShowPLUModal(false)}
        title="Search PLU Codes"
        description="Find standardized produce codes used by farmers markets"
        size="lg"
      >
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or code..."
              className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl"
            />
          </div>

          <div className="max-h-80 overflow-y-auto space-y-2">
            {pluDatabase.map((plu) => (
              <button
                key={plu.code}
                onClick={() => handlePLUSelect(plu)}
                className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-green-50 rounded-xl transition-colors text-left"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center border border-gray-100">
                    <span className="text-sm font-bold text-gray-400">{plu.code}</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{plu.name}</p>
                    <p className="text-sm text-gray-500">
                      {plu.category} • {plu.typicalUnit}
                    </p>
                  </div>
                </div>
                <Check className="w-5 h-5 text-green-500 opacity-0" />
              </button>
            ))}
          </div>
        </div>
      </Modal>
    </div>
  );
}
