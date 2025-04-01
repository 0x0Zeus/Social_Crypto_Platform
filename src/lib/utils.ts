import axios from "axios"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number, options: Intl.NumberFormatOptions = {}): string {
  return new Intl.NumberFormat("en-US", options).format(num)
}

export function formatCurrency(amount: number): string {
  return formatNumber(amount, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export function formatLargeNumber(num: number): string {
  if (num >= 1e9) {
    return formatNumber(num / 1e9, { maximumFractionDigits: 2 }) + "B"
  } else if (num >= 1e6) {
    return formatNumber(num / 1e6, { maximumFractionDigits: 2 }) + "M"
  } else if (num >= 1e3) {
    return formatNumber(num / 1e3, { maximumFractionDigits: 2 }) + "K"
  } else {
    return formatNumber(num, { maximumFractionDigits: 2 })
  }
}

export function formatPercentage(percent: number): string {
  return formatNumber(percent, {
    style: "percent",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    signDisplay: "exceptZero",
  })
}

export function getPercentageColor(percent: number): string {
  if (percent > 0) {
    return "text-green-600"
  } else if (percent < 0) {
    return "text-red-600"
  } else {
    return "text-gray-600"
  }
}

export async function getMetaData(coinId: number) {
  console.log("coinId ===============================> ", coinId)
  const url = `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?id=${coinId}`
  try {
    const response = await axios.get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.NEXT_CMC_API_KEY,
      },
    });
    console.log("response ----------------> ", response.data)
    const data = response.data;
    return data.data[coinId].logo
  } catch (err) {
    console.error("Error fetching metadata:", err);
  }
}