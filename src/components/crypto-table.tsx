"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency, formatLargeNumber, formatPercentage, getPercentageColor } from "@/lib/utils"
import type { Coin, CoinMarketCapResponse } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import axios from "axios"

export default function CryptoTable() {
  const [coins, setCoins] = useState<Coin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/listings")

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

    fetchCoins()
    const intervalId = setInterval(fetchCoins, 30000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px] pl-5">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">24h %</TableHead>
            <TableHead className="text-right">7d %</TableHead>
            <TableHead className="text-right">Market Cap</TableHead>
            <TableHead className="text-right">Volume (24h)</TableHead>
            <TableHead className="text-right pr-5">Circulating Supply</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array(10)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="pl-5">
                    <Skeleton className="h-5 w-8" />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-20 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-16 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-16 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-24 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-24 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right pr-5">
                    <Skeleton className="h-5 w-24 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
          ) : error ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-red-500">
                {error}
              </TableCell>
            </TableRow>
          ) : coins && coins.length > 0 ? (
            coins.map((coin, index) => (
              <TableRow key={coin.id}>
                <TableCell className="pl-5">{index + 1}</TableCell>
                <TableCell className="font-medium">
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
                    <span>{coin.name}</span>
                    <span className="text-muted-foreground text-xs">{coin.symbol}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{formatCurrency(coin.quote.USD.price)}</TableCell>
                <TableCell className={`text-right ${getPercentageColor(coin.quote.USD.percent_change_24h)}`}>
                  {formatPercentage(coin.quote.USD.percent_change_24h / 100)}
                </TableCell>
                <TableCell className={`text-right ${getPercentageColor(coin.quote.USD.percent_change_7d)}`}>
                  {formatPercentage(coin.quote.USD.percent_change_7d / 100)}
                </TableCell>
                <TableCell className="text-right">{formatLargeNumber(coin.quote.USD.market_cap)}</TableCell>
                <TableCell className="text-right">{formatLargeNumber(coin.quote.USD.volume_24h)}</TableCell>
                <TableCell className="text-right pr-5">
                  {formatLargeNumber(coin.circulating_supply)} {coin.symbol}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center text-muted-foreground">
                No cryptocurrency data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

