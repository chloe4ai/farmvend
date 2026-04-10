"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Input, Select } from "@/components/ui/Input";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const businessName = formData.get("businessName") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const marketDay = formData.get("marketDay") as string;

    if (!businessName || !email || !password || !marketDay) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    const supabase = createClient();

    // Sign up with Supabase Auth
    const { data, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          business_name: businessName,
          primary_market_day: marketDay,
        },
      },
    });

    if (authError) {
      setError(authError.message);
      setIsLoading(false);
      return;
    }

    // If email confirmation is required
    if (data.user && !data.session) {
      setError("");
      setIsLoading(false);
      alert("Check your email for a confirmation link to complete signup.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 rounded-xl bg-green-500 flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-7 h-7 text-white"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-gray-800">FarmVend</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-card p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Create your account</h1>
          <p className="text-gray-500 mb-8">Start your 14-day free trial</p>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <Input
              label="Business Name"
              name="businessName"
              placeholder="Green Valley Farm"
              required
            />
            <Input
              label="Email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <Input
              label="Password"
              name="password"
              type="password"
              placeholder="Create a strong password"
              hint="At least 8 characters"
              required
            />
            <Select
              label="Primary Market Day"
              name="marketDay"
              options={[
                { value: "saturday", label: "Saturday" },
                { value: "sunday", label: "Sunday" },
              ]}
              required
            />

            <div className="pt-2">
              <Button type="submit" className="w-full" isLoading={isLoading}>
                Create Account
              </Button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link href="/login" className="text-green-600 hover:text-green-700 font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Terms */}
        <p className="mt-6 text-center text-sm text-gray-400">
          By signing up, you agree to our{" "}
          <a href="#" className="text-gray-500 hover:text-gray-600">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-gray-500 hover:text-gray-600">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
