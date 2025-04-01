"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { formatCurrency, formatPercentage } from "@/lib/utils"
import type { Coin, CoinMarketCapResponse } from "@/lib/types"
import { TrendingDown } from "lucide-react"
import Image from "next/image"
import axios from "axios"

export default function LosingCoinsWeek() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLosingCoins = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/losing")

        const data = response.data
        console.log("data", data)
        if (data.status?.error_code && data.status.error_code !== 0) {
          throw new Error(data.status.error_message || "Unknown API error")
        }

        if (!data || !Array.isArray(data) || data.length === 0) {
          throw new Error("No data returned from API")
        }

        setCoins(data)
      } catch (err) {
        console.error("Error fetching trending coins:", err)
        setError("Failed to load trending coins")
      } finally {
        setLoading(false)
      }
    }

    fetchLosingCoins()
  }, [])

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <TrendingDown className="h-5 w-5 text-red-600" />
          Biggest Losers (Week)
        </CardTitle>
        <CardDescription>Largest declines in last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        {error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          <div className="space-y-2 max-h-[250px] overflow-y-auto pr-1 scrollbar-thin">
            {loading && coins.length === 0 ? (
              // Show skeletons only if we don't have any data yet
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                    <Skeleton className="h-5 w-20" />
                  </div>
                ))
            ) : coins.length > 0 ? (
              // Show available coins
              coins.map((coin) => (
                <div key={coin.id} className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {/* {coin.logo ? (
                      <Image
                        src={coin.logo || "/placeholder.svg"}
                        alt={`${coin.name} logo`}
                        width={24}
                        height={24}
                        className="rounded-full"
                        onError={(e) => {
                          // Fallback to a placeholder if image fails to load
                          const target = e.currentTarget as HTMLImageElement
                          target.onerror = null // Prevent infinite loop
                          target.src = `https://ui-avatars.com/api/?name=${coin.symbol}&background=random&size=24`
                        }}
                      />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold">
                        {coin.symbol.charAt(0)}
                      </div>
                    )} */}
                    <Image
                      src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${coin.id}.png`}
                      alt={`${coin.name} logo`}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium">{coin.symbol}</span>
                      <span className="text-xs text-muted-foreground">{coin.name}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="font-medium">{formatCurrency(coin.quote.USD.volume_7d)}</span>
                    <span className="text-xs text-red-600">
                      {formatPercentage(coin.quote.USD.percent_change_7d / 100)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-muted-foreground text-sm">No growing coins available</div>
            )}
            {loading && coins.length > 0 && (
              // Show loading indicator at the bottom if we're still loading more data
              <div className="flex justify-center py-2">
                <div className="animate-spin h-4 w-4 border-2 border-red-600 rounded-full border-t-transparent"></div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

