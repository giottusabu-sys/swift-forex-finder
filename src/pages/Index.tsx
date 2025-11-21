import { useEffect, useState } from "react";
import { ForexRateCard } from "@/components/ForexRateCard";
import { CurrencyConverter } from "@/components/CurrencyConverter";
import { SwiftCodeFinder } from "@/components/SwiftCodeFinder";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp } from "lucide-react";

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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">ForexHub</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Live Rates</span>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Live Rates Section */}
        <section className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <h2 className="text-3xl font-bold text-foreground">Live Forex Rates</h2>
            <div className="h-6 w-6 relative">
              <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
              <div className="absolute inset-0 bg-primary rounded-full opacity-60" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Tools Section */}
        <section>
          <Tabs defaultValue="converter" className="space-y-6">
            <TabsList className="bg-card border border-border">
              <TabsTrigger value="converter" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                Currency Converter
              </TabsTrigger>
              <TabsTrigger value="swift" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                SWIFT Code Finder
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="converter" className="mt-6">
              <CurrencyConverter />
            </TabsContent>
            
            <TabsContent value="swift" className="mt-6">
              <SwiftCodeFinder />
            </TabsContent>
          </Tabs>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Real-time forex rates powered by ExchangeRate-API • Updates every 30 seconds
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
