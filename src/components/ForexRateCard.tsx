import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";

interface ForexRateCardProps {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  change: number;
  fromFlag?: string;
  toFlag?: string;
}

export const ForexRateCard = ({
  fromCurrency,
  toCurrency,
  rate,
  change,
  fromFlag = "🌐",
  toFlag = "🌐",
}: ForexRateCardProps) => {
  const isPositive = change >= 0;

  return (
    <Card className="p-6 bg-card border-border hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{fromFlag}</span>
          <span className="text-xl text-muted-foreground">→</span>
          <span className="text-3xl">{toFlag}</span>
        </div>
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          <span className="text-sm font-semibold">
            {isPositive ? "+" : ""}{change.toFixed(2)}%
          </span>
        </div>
      </div>
      <div className="space-y-2">
        <div className="text-sm font-medium text-muted-foreground">
          {fromCurrency} to {toCurrency}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold text-foreground">{rate.toFixed(4)}</span>
          <span className="text-base text-muted-foreground">{toCurrency}</span>
        </div>
      </div>
    </Card>
  );
};
