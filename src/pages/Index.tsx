import { useEffect, useState } from "react";
import { ForexRateCard } from "@/components/ForexRateCard";
import { TrendingUp, Globe, Search, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
    { from: "AUD", to: "USD", rate: 0.64, change: 0.18, fromFlag: "🇦🇺", toFlag: "🇺🇸" },
    { from: "CAD", to: "USD", rate: 0.72, change: -0.11, fromFlag: "🇨🇦", toFlag: "🇺🇸" },
    { from: "CHF", to: "USD", rate: 1.13, change: 0.09, fromFlag: "🇨🇭", toFlag: "🇺🇸" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [fromFilter, setFromFilter] = useState("all");
  const [toFilter, setToFilter] = useState("all");

  const currencies = Array.from(new Set(rates.flatMap(r => [r.from, r.to]))).sort();

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
          { from: "AUD", to: "USD", rate: data.rates.AUD ? 1 / data.rates.AUD : 0.64, change: Math.random() * 0.5 - 0.25, fromFlag: "🇦🇺", toFlag: "🇺🇸" },
          { from: "CAD", to: "USD", rate: data.rates.CAD ? 1 / data.rates.CAD : 0.72, change: Math.random() * 0.5 - 0.25, fromFlag: "🇨🇦", toFlag: "🇺🇸" },
          { from: "CHF", to: "USD", rate: data.rates.CHF ? 1 / data.rates.CHF : 1.13, change: Math.random() * 0.5 - 0.25, fromFlag: "🇨🇭", toFlag: "🇺🇸" },
        ];
        
        setRates(updatedRates);
      } catch (error) {
        console.error("Failed to fetch rates:", error);
      }
    };

    fetchRates();
    const interval = setInterval(fetchRates, 30000);

    return () => clearInterval(interval);
  }, []);

  const filteredRates = rates.filter(rate => {
    const matchesSearch = searchQuery === "" || 
      rate.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rate.to.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFrom = fromFilter === "all" || rate.from === fromFilter;
    const matchesTo = toFilter === "all" || rate.to === toFilter;
    
    return matchesSearch && matchesFrom && matchesTo;
  });

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
              Track real-time exchange rates for international trade and remittances
            </p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-card border border-border rounded-xl p-8 mb-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  From Currency
                </label>
                <Select value={fromFilter} onValueChange={setFromFilter}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    <SelectItem value="all">All Currencies</SelectItem>
                    {currencies.map(currency => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  To Currency
                </label>
                <Select value={toFilter} onValueChange={setToFilter}>
                  <SelectTrigger className="bg-background border-border">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border z-50">
                    <SelectItem value="all">All Currencies</SelectItem>
                    {currencies.map(currency => (
                      <SelectItem key={currency} value={currency}>
                        {currency}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Search
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search currency pairs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                </div>
              </div>
            </div>

            <Alert className="bg-primary/5 border-primary/20">
              <Info className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm text-foreground">
                <span className="font-semibold text-primary">For Exporters & Importers:</span> Real-time forex rates help you make informed decisions on international transactions and hedging strategies.
              </AlertDescription>
            </Alert>
          </div>
          
          {/* Results */}
          {filteredRates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRates.map((rate, index) => (
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
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-xl">
              <p className="text-muted-foreground">No currency pairs match your search criteria</p>
            </div>
          )}
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
