export interface Coin {
  id: number
  name: string
  symbol: string
  slug: string
  cmc_rank: number
  num_market_pairs: number
  circulating_supply: number
  total_supply: number
  max_supply: number | null
  last_updated: string
  date_added: string
  tags: string[]
  logo?: string | null
  urls?: {
    website?: string[]
    twitter?: string[]
    message_board?: string[]
    chat?: string[]
    facebook?: string[]
    explorer?: string[]
    reddit?: string[]
    technical_doc?: string[]
    source_code?: string[]
    announcement?: string[]
  } | null
  quote: {
    USD: {
      price: number
      volume_24h: number
      volume_7d: number
      volume_change_24h: number
      percent_change_1h: number
      percent_change_24h: number
      percent_change_7d: number
      percent_change_30d: number
      market_cap: number
      market_cap_dominance: number
      fully_diluted_market_cap: number
      last_updated: string
    }
  }
}

export interface CoinMarketCapResponse {
  status: {
    timestamp: string
    error_code: number
    error_message: string | null
    elapsed: number
    credit_count: number
    notice: string | null
  }
  data: Coin[]
}

export interface SocialStats {
  twitter_mentions: number
  instagram_mentions: number
  tiktok_mentions: number
  telegram_members: number
}

export interface SocialCoin {
  id: number
  name: string
  symbol: string
  logo?: string | null
  social_stats: SocialStats
}

export interface SocialDataResponse {
  data: SocialCoin[]
}

export interface GlobalMetricsResponse {
  status: {
    timestamp: string
    error_code: number
    error_message: string | null
    elapsed: number
    credit_count: number
    notice: string | null
  }
  data: {
    active_cryptocurrencies: number
    total_cryptocurrencies: number
    active_market_pairs: number
    active_exchanges: number
    total_exchanges: number
    eth_dominance: number
    btc_dominance: number
    defi_volume_24h: number
    defi_volume_24h_reported: number
    defi_market_cap: number
    defi_24h_percentage_change: number
    stablecoin_volume_24h: number
    stablecoin_volume_24h_reported: number
    stablecoin_market_cap: number
    stablecoin_24h_percentage_change: number
    derivatives_volume_24h: number
    derivatives_volume_24h_reported: number
    derivatives_24h_percentage_change: number
    quote: {
      USD: {
        total_market_cap: number
        total_volume_24h: number
        total_volume_24h_reported: number
        altcoin_volume_24h: number
        altcoin_volume_24h_reported: number
        altcoin_market_cap: number
        defi_volume_24h: number
        defi_volume_24h_reported: number
        defi_24h_percentage_change: number
        defi_market_cap: number
        stablecoin_volume_24h: number
        stablecoin_volume_24h_reported: number
        stablecoin_market_cap: number
        stablecoin_24h_percentage_change: number
        derivatives_volume_24h: number
        derivatives_volume_24h_reported: number
        derivatives_24h_percentage_change: number
        last_updated: string
        total_market_cap_yesterday: number
        total_volume_24h_yesterday: number
        total_market_cap_yesterday_percentage_change: number
        total_volume_24h_yesterday_percentage_change: number
      }
    }
  }
}

export interface CoinMetadata {
  id: number
  name: string
  symbol: string
  category: string
  description: string
  slug: string
  logo: string
  subreddit: string
  notice: string
  tags: string[]
  tag_names: string[]
  tag_groups: string[]
  urls: {
    website: string[]
    twitter: string[]
    message_board: string[]
    chat: string[]
    facebook: string[]
    explorer: string[]
    reddit: string[]
    technical_doc: string[]
    source_code: string[]
    announcement: string[]
  }
  platform: null | {
    id: number
    name: string
    symbol: string
    slug: string
    token_address: string
  }
  date_added: string
  twitter_username: string
  is_hidden: number
  date_launched: string | null
  self_reported_circulating_supply: number | null
  self_reported_market_cap: number | null
}

export interface CoinMetadataResponse {
  status: {
    timestamp: string
    error_code: number
    error_message: string | null
    elapsed: number
    credit_count: number
    notice: string | null
  }
  data: {
    [symbol: string]: CoinMetadata
  }
}

