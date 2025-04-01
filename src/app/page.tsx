'use client'

import CryptoTable from "@/components/crypto-table"
import GrowingCoins24h from "@/components/growing-coins-24h"
import GrowingCoinsWeek from "@/components/growing-coins-week"
import LosingCoinsWeek from "@/components/losing-coins-week"
import SocialReachTable from "@/components/social-reach-table"
import TrendingCoins from "@/components/trending-coins"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="rounded-full w-9 h-9 transition-all duration-300 hover:scale-110 cursor-pointer"
    >
      {theme === 'dark' ? (
        <SunIcon className="h-4 w-4 animate-pulse-soft" />
      ) : (
        <MoonIcon className="h-4 w-4 animate-pulse-soft" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

const Home = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-accent dark:from-background dark:to-accent p-4 md:p-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in relative z-10">
        <header className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
              Crypto Social Insights
            </h1>
            <p className="text-muted-foreground">Track trending cryptocurrencies and their social media presence</p>
          </div>
          <ThemeToggle />
        </header>
        <div className="crypto-grid animate-slide-up [animation-delay:200ms]">
          <TrendingCoins />
          <GrowingCoins24h />
          <GrowingCoinsWeek />
          <LosingCoinsWeek />
        </div>
        <Tabs defaultValue="market" className="w-full animate-slide-up [animation-delay:400ms]">
          <TabsList className="w-full grid grid-cols-2 p-1 rounded-xl">
            <TabsTrigger value="market" className="text-sm rounded-lg">
              Market Data
            </TabsTrigger>
            <TabsTrigger value="social" className="text-sm rounded-lg">
              Social Reach
            </TabsTrigger>
          </TabsList>
          <TabsContent value="market" className="animate-scale-in mt-6">
            <CryptoTable />
          </TabsContent>
          <TabsContent value="social" className="animate-scale-in mt-6">
            <SocialReachTable />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default Home