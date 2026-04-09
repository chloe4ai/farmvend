"use client";

import { useState } from "react";
import {
  User,
  Building2,
  CreditCard,
  Bell,
  Shield,
  Palette,
  Link as LinkIcon,
  Check,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";

const tabs = [
  { id: "profile", name: "Profile", icon: User },
  { id: "business", name: "Business", icon: Building2 },
  { id: "payments", name: "Payments", icon: CreditCard },
  { id: "notifications", name: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="flex gap-8">
      {/* Sidebar */}
      <div className="w-64 shrink-0">
        <nav className="space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Content */}
      <div className="flex-1 max-w-2xl">
        {activeTab === "profile" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-green-100 flex items-center justify-center">
                    <span className="text-3xl font-bold text-green-600">GV</span>
                  </div>
                  <div>
                    <Button variant="secondary" size="sm">Change Photo</Button>
                    <p className="text-xs text-gray-400 mt-1">JPG, PNG or GIF. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" defaultValue="Sarah" />
                  <Input label="Last Name" defaultValue="Chen" />
                </div>
                <Input label="Email" type="email" defaultValue="sarah@greenvalley.farm" />
                <Input label="Phone" type="tel" defaultValue="+1 (555) 123-4567" />

                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <Input label="Current Password" type="password" />
                <Input label="New Password" type="password" />
                <Input label="Confirm New Password" type="password" />

                <div className="pt-4">
                  <Button variant="secondary">Update Password</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "business" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <Input label="Business Name" defaultValue="Green Valley Farm" />
                <Input label="DBA (Doing Business As)" defaultValue="Green Valley Organics" />
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Business Type" defaultValue="LLC" />
                  <Input label="Tax ID / EIN" defaultValue="12-3456789" />
                </div>
                <Input label="Website" defaultValue="https://greenvalley.farm" />

                <div className="pt-4">
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Market Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <Select
                  label="Primary Market Day"
                  options={[
                    { value: "saturday", label: "Saturday" },
                    { value: "sunday", label: "Sunday" },
                  ]}
                  defaultValue="saturday"
                />
                <Input label="Default Location" defaultValue="Downtown Farmers Market" />
                <Input label="Default Currency" defaultValue="USD" disabled />

                <div className="pt-4">
                  <Button>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "payments" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="p-4 border border-gray-200 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-xs font-bold text-white">VISA</span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">•••• •••• •••• 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/25</p>
                    </div>
                  </div>
                  <Badge variant="success">Default</Badge>
                </div>

                <Button variant="secondary" className="w-full">
                  Add Payment Method
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Square Integration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="p-4 bg-green-50 rounded-xl border border-green-100 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-green-800">Square Connected</p>
                    <p className="text-sm text-green-600">Last sync: 2 hours ago</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Account ID</span>
                    <span className="font-medium text-gray-800">sq0atp-•••••••••</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="text-gray-500">Transaction Fee</span>
                    <span className="font-medium text-gray-800">2.6% + $0.10</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <span className="text-gray-500">Location</span>
                    <span className="font-medium text-gray-800">Downtown Market</span>
                  </div>
                </div>

                <Button variant="secondary">Disconnect Square</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Fee Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 mb-4">
                  FarmVend shows you the true cost of each transaction after fees.
                </p>
                <div className="p-4 bg-gray-50 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Sample $50 sale:</span>
                    <span></span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Gross Amount</span>
                    <span className="font-medium">$50.00</span>
                  </div>
                  <div className="flex items-center justify-between text-sm text-red-500">
                    <span>Square Fee (2.6% + $0.10)</span>
                    <span>-$1.40</span>
                  </div>
                  <div className="flex items-center justify-between text-sm border-t border-gray-200 pt-2">
                    <span className="font-medium text-gray-800">You Receive</span>
                    <span className="font-bold text-green-600">$48.60</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "notifications" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-5">
                {[
                  { label: "Daily sales summary", description: "Receive a summary after each market day", enabled: true },
                  { label: "Low inventory alerts", description: "Get notified when stock falls below threshold", enabled: true },
                  { label: "Weekly analytics report", description: "Receive weekly performance insights", enabled: false },
                  { label: "Payment notifications", description: "Instant alerts for successful payments", enabled: true },
                  { label: "Price change alerts", description: "Notify when competitor prices change significantly", enabled: false },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{item.label}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                    <button
                      className={`relative w-11 h-6 rounded-full transition-colors ${
                        item.enabled ? "bg-green-500" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          item.enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
