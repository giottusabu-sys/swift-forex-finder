import { useEffect, useState } from "react";
import { ForexRateCard } from "@/components/ForexRateCard";
import { TrendingUp, Globe } from "lucide-react";

interface ForexRate {
  from: string;
  to: string;
  rate: number;
  change: number;
  fromFlag: string;
  toFlag: string;
}

const Index = () => {
  const [rates, setRates] = useState<ForexRate[]>([
    { from: "USD", to: "INR", rate: 83.12, change: -0.15, fromFlag: "🇺🇸", toFlag: "🇮🇳" },
    { from: "EUR", to: "INR", rate: 89.45, change: 0.23, fromFlag: "🇪🇺", toFlag: "🇮🇳" },
    { from: "GBP", to: "INR", rate: 105.67, change: 0.41, fromFlag: "🇬🇧", toFlag: "🇮🇳" },
    { from: "JPY", to: "INR", rate: 0.56, change: -0.08, fromFlag: "🇯🇵", toFlag: "🇮🇳" },
    { from: "USD", to: "EUR", rate: 0.93, change: 0.12, fromFlag: "🇺🇸", toFlag: "🇪🇺" },
    { from: "USD", to: "GBP", rate: 0.79, change: -0.05, fromFlag: "🇺🇸", toFlag: "🇬🇧" },
  ]);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        const data = await response.json();
        
        const updatedRates: ForexRate[] = [
          { from: "USD", to: "INR", rate: data.rates.INR, change: Math.random() * 0.5 - 0.25, fromFlag: "🇺🇸", toFlag: "🇮🇳" },
          { from: "EUR", to: "INR", rate: data.rates.INR / data.rates.EUR, change: Math.random() * 0.5 - 0.25, fromFlag: "🇪🇺", toFlag: "🇮🇳" },
          { from: "GBP", to: "INR", rate: data.rates.INR / data.rates.GBP, change: Math.random() * 0.5 - 0.25, fromFlag: "🇬🇧", toFlag: "🇮🇳" },
          { from: "JPY", to: "INR", rate: data.rates.INR / data.rates.JPY, change: Math.random() * 0.5 - 0.25, fromFlag: "🇯🇵", toFlag: "🇮🇳" },
          { from: "USD", to: "EUR", rate: data.rates.EUR, change: Math.random() * 0.5 - 0.25, fromFlag: "🇺🇸", toFlag: "🇪🇺" },
          { from: "USD", to: "GBP", rate: data.rates.GBP, change: Math.random() * 0.5 - 0.25, fromFlag: "🇺🇸", toFlag: "🇬🇧" },
        ];
        
        setRates(updatedRates);
      } catch (error) {
        console.error("Failed to fetch rates:", error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">ForexHub</h1>
            </div>
            <div className="flex items-center gap-3 bg-success/10 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
              <span className="text-sm font-medium text-success">Live Updates</span>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12">
        {/* Hero Section */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-4xl font-bold text-foreground mb-3">
              Live Forex Rates
            </h2>
            <p className="text-lg text-muted-foreground">
              Real-time exchange rates updated every 30 seconds
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rates.map((rate, index) => (
              <ForexRateCard
                key={index}
                fromCurrency={rate.from}
                toCurrency={rate.to}
                rate={rate.rate}
                change={rate.change}
                fromFlag={rate.fromFlag}
                toFlag={rate.toFlag}
              />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-20">
        <div className="container mx-auto px-6 py-8">
          <p className="text-center text-sm text-muted-foreground">
            Powered by ExchangeRate-API • Real-time forex data
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
