import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const swiftCodes = [
  { bank: "State Bank of India", swift: "SBININBB", country: "India", city: "Mumbai" },
  { bank: "HDFC Bank", swift: "HDFCINBB", country: "India", city: "Mumbai" },
  { bank: "ICICI Bank", swift: "ICICINBB", country: "India", city: "Mumbai" },
  { bank: "JPMorgan Chase", swift: "CHASUS33", country: "USA", city: "New York" },
  { bank: "Bank of America", swift: "BOFAUS3N", country: "USA", city: "New York" },
  { bank: "HSBC UK", swift: "HBUKGB4B", country: "UK", city: "London" },
  { bank: "Barclays", swift: "BARCGB22", country: "UK", city: "London" },
  { bank: "Deutsche Bank", swift: "DEUTDEFF", country: "Germany", city: "Frankfurt" },
];

export const SwiftCodeFinder = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState(swiftCodes);

  const handleSearch = () => {
    if (!search.trim()) {
      setResults(swiftCodes);
      return;
    }
    
    const filtered = swiftCodes.filter(
      (code) =>
        code.bank.toLowerCase().includes(search.toLowerCase()) ||
        code.swift.toLowerCase().includes(search.toLowerCase()) ||
        code.country.toLowerCase().includes(search.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <Card className="p-6 bg-card border-border">
      <h2 className="text-2xl font-bold mb-6 text-foreground">SWIFT Code Finder</h2>
      
      <div className="flex gap-2 mb-6">
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          placeholder="Search by bank name, SWIFT code, or country..."
          className="bg-secondary border-border text-foreground"
        />
        <Button onClick={handleSearch} className="bg-primary hover:bg-primary/90">
          <Search className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {results.map((code, index) => (
          <div
            key={index}
            className="p-4 bg-secondary rounded-lg border border-border hover:border-primary/50 transition-all"
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-foreground">{code.bank}</h3>
              <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded">
                {code.country}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">{code.city}</div>
              <div className="text-lg font-mono font-bold text-primary">{code.swift}</div>
            </div>
          </div>
        ))}
        {results.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            No results found. Try a different search term.
          </div>
        )}
      </div>
    </Card>
  );
};
