import { useEffect, useState } from "react";
import { api } from "../services/api";

interface MarketTotal {
  market: "PINGO_DOCE" | "MERCADONA" | "CONTINENTE";
  total: number;
}

export function Dashboard() {
  const [total, setTotal] = useState(0);
  const [markets, setMarkets] = useState<MarketTotal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await api.get("/dashboard/monthly");
        setTotal(response.data.total);
        setMarkets(response.data.byMarket);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-6 text-moss-600 font-medium">
        A carregar dashboard 📊
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* TOTAL */}
      <div className="bg-moss-600 text-white rounded-2xl p-6 shadow">
        <p className="text-sm opacity-80">Total gasto no mês</p>
        <h2 className="text-3xl font-bold mt-2">€ {total.toFixed(2)}</h2>
      </div>

      {/* MERCADOS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {markets.map((item) => (
          <div
            key={item.market}
            className="bg-white rounded-xl p-4 shadow flex flex-col"
          >
            <span className="text-sm text-gray-500">
              {formatMarket(item.market)}
            </span>
            <span className="text-xl font-semibold text-moss-700 mt-2">
              € {item.total.toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatMarket(market: string) {
  switch (market) {
    case "PINGO_DOCE":
      return "🛒 Pingo Doce";
    case "MERCADONA":
      return "🛒 Mercadona";
    case "CONTINENTE":
      return "🛒 Continente";
    default:
      return market;
  }
}
