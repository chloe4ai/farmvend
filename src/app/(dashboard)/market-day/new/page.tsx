"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Camera, Package, DollarSign, MapPin } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";

export default function NewMarketDayPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  async function handleStartDay() {
    setIsLoading(true);
    // In production, this would create a new market day in Supabase
    setTimeout(() => {
      router.push("/market-day/live");
    }, 1500);
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/market-day">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Start Market Day</h1>
          <p className="text-gray-500">Set up your market day for success</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                s <= step ? "bg-green-500 text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              {s}
            </div>
            {s < 3 && (
              <div
                className={`w-16 h-1 ${
                  s < step ? "bg-green-500" : "bg-gray-100"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Market Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Date"
                type="date"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
              <Select
                label="Day Type"
                options={[
                  { value: "market", label: "Farmers Market" },
                  { value: "wholesale", label: "Wholesale Delivery" },
                ]}
              />
            </div>
            <Input
              label="Location"
              placeholder="Downtown Farmers Market"
            />
            <Input
              label="Weather (optional)"
              placeholder="Sunny, 72°F"
            />
            <div className="pt-4">
              <Button onClick={() => setStep(2)} className="w-full">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Opening Inventory */}
      {step === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Opening Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-sm text-gray-500">
              Take a photo of your display and record the quantities you brought today.
            </p>

            <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-green-300 transition-colors cursor-pointer">
              <Camera className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">Take inventory photo</p>
              <p className="text-sm text-gray-400 mt-1">
                Or drag and drop an image from your device
              </p>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Quick add products</p>
              <div className="grid grid-cols-2 gap-3">
                {["Organic Bananas", "Fresh Strawberries", "Heirloom Tomatoes", "Baby Spinach"].map(
                  (product) => (
                    <div
                      key={product}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center gap-2">
                        <Package className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-700">{product}</span>
                      </div>
                      <Button variant="ghost" size="sm">+ Add</Button>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button variant="secondary" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1">
                Continue
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Review & Start */}
      {step === 3 && (
        <Card>
          <CardHeader>
            <CardTitle>Ready to Start</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">You&apos;re all set!</p>
                  <p className="text-sm text-gray-500">
                    Your opening inventory is recorded. Start making sales.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Date</span>
                <span className="font-medium text-gray-800">
                  {new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Location</span>
                <span className="font-medium text-gray-800">Downtown Farmers Market</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Opening Inventory</span>
                <span className="font-medium text-gray-800">24 products</span>
              </div>
            </div>

            <div className="pt-4 flex gap-3">
              <Button variant="secondary" onClick={() => setStep(2)} className="flex-1">
                Back
              </Button>
              <Button onClick={handleStartDay} isLoading={isLoading} className="flex-1">
                Start Selling
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
