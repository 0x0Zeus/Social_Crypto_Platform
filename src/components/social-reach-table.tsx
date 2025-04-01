"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatLargeNumber } from "@/lib/utils"
import type { SocialCoin, SocialDataResponse } from "@/lib/types"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { FaInstagram, FaTelegram, FaTiktok, FaTwitter } from "react-icons/fa6"
import axios from "axios"

export default function SocialReachTable() {
  const [coins, setCoins] = useState<SocialCoin[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSocialData = async () => {
      try {
        setLoading(true)
        const response = await axios.get("/api/social")

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

    // fetchSocialData()
  }, [])

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="pl-5">Coin</TableHead>
            <TableHead className="text-right">
              <div className="flex items-center justify-end gap-1">
                <FaTwitter className="h-4 w-4" />
                <span>Twitter</span>
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div className="flex items-center justify-end gap-1">
                <FaInstagram className="h-4 w-4" />
                <span>Instagram</span>
              </div>
            </TableHead>
            <TableHead className="text-right">
              <div className="flex items-center justify-end gap-1">
                <FaTiktok className="h-4 w-4" />
                <span>TikTok</span>
              </div>
            </TableHead>
            <TableHead className="text-right pr-5">
              <div className="flex items-center justify-end gap-1">
                <FaTelegram className="h-4 w-4" />
                <span>Telegram</span>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array(10)
              .fill(0)
              .map((_, i) => (
                <TableRow key={i}>
                  <TableCell className="pl-5">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-6 w-6 rounded-full" />
                      <Skeleton className="h-5 w-32" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-20 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-20 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-5 w-20 ml-auto" />
                  </TableCell>
                  <TableCell className="text-right pr-5">
                    <Skeleton className="h-5 w-20 ml-auto" />
                  </TableCell>
                </TableRow>
              ))
          ) : error ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-red-500">
                {error}
              </TableCell>
            </TableRow>
          ) : coins && coins.length > 0 ? (
            coins.map((coin) => (
              <TableRow key={coin.id}>
                <TableCell className="font-medium pl-5">
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
                      src={`https://s2.coinmarketcap.com/static/img/exchanges/64x64/${coin.id}.png`}
                      alt={`${coin.name} logo`}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                    <span>{coin.name}</span>
                    <span className="text-muted-foreground text-xs">{coin.symbol}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right"></TableCell>
                <TableCell className="text-right"></TableCell>
                <TableCell className="text-right"></TableCell>
                <TableCell className="text-right pr-5"></TableCell>
                {/* <TableCell className="text-right pr-5">{formatLargeNumber(coin.social_stats.telegram_members)}</TableCell> */}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground">
                No social data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

