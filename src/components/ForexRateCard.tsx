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
    <Card className="p-4 bg-card border-border hover:border-primary/50 transition-all cursor-pointer group">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{fromFlag}</span>
          <span className="text-sm text-muted-foreground">→</span>
          <span className="text-2xl">{toFlag}</span>
        </div>
        <div className={`flex items-center gap-1 ${isPositive ? "text-success" : "text-destructive"}`}>
          {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-semibold text-foreground">
            {fromCurrency} to {toCurrency}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground">{rate.toFixed(4)}</span>
          <span className="text-sm text-muted-foreground">{toCurrency}</span>
        </div>
        <div className={`text-sm font-medium ${isPositive ? "text-success" : "text-destructive"}`}>
          {isPositive ? "+" : ""}{change.toFixed(2)}%
        </div>
      </div>
    </Card>
  );
};
