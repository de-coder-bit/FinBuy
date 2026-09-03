import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinBuy - Buy Products on Mutual Fund Backed EMI",
  description:
    "Upgrade to the latest smartphones and laptops on 0% Interest EMI backed by your mutual funds without selling your investments. Powered by FinBuy.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50/50 min-h-screen flex flex-col text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
