# 🚀 Crypto Social Insights Platform

A modern, real-time cryptocurrency analytics platform that combines market data with social media insights. Built with Next.js 15, TypeScript, and Tailwind CSS, this application provides comprehensive crypto market analysis and trending information.

## 📱 Screenshots

![Crypto Social Insights Platform](https://raw.githubusercontent.com/0x0Zeus/Social_Crypto_Platform/master/public/social-crypto-platform.webp)
*Crypto Social Insights Platform - Real-time cryptocurrency analytics dashboard*

## ✨ Features

### 📊 Market Analytics
- **Real-time Market Data**: Live cryptocurrency prices, market cap, and volume data
- **Trending Coins**: Top 5 trending cryptocurrencies with price changes
- **Performance Tracking**: 24-hour and 7-day performance metrics
- **Market Rankings**: Comprehensive coin listings with detailed metrics

### 📈 Advanced Analytics
- **Growing Coins (24h)**: Cryptocurrencies with highest 24-hour gains
- **Growing Coins (Week)**: Weekly top performers
- **Losing Coins**: Coins experiencing significant losses
- **Market Cap Analysis**: Detailed market capitalization data

### 🌐 Social Media Integration
- **Social Reach Table**: Track cryptocurrency mentions across platforms
- **Multi-platform Analytics**: Twitter, Instagram, TikTok, and Telegram metrics
- **Social Sentiment**: Monitor social media buzz around cryptocurrencies

### 🎨 Modern UI/UX
- **Dark/Light Theme**: Seamless theme switching with smooth animations
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: Auto-refreshing data every 30 seconds
- **Interactive Tables**: Sortable and filterable data tables
- **Loading States**: Skeleton loaders for better user experience

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Icons** - Additional icon library

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **CoinMarketCap API** - Real-time cryptocurrency data
- **Axios** - HTTP client for API requests

### Development Tools
- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Class Variance Authority** - Component variant management

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- CoinMarketCap API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Social_Crypto_Platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_CMC_API_KEY=your_coinmarketcap_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── listings/      # Market data endpoint
│   │   ├── trending/      # Trending coins endpoint
│   │   ├── growing-24h/   # 24h gainers endpoint
│   │   ├── growing-week/  # Weekly gainers endpoint
│   │   ├── losing/        # Losing coins endpoint
│   │   └── social/        # Social media data endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   └── ...
│   ├── crypto-table.tsx  # Main market data table
│   ├── trending-coins.tsx # Trending coins widget
│   ├── social-reach-table.tsx # Social media analytics
│   └── ...
└── lib/                  # Utilities and types
    ├── types.ts          # TypeScript type definitions
    └── utils.ts          # Helper functions
```

## 🔧 API Endpoints

| Endpoint | Description | Data Source |
|----------|-------------|-------------|
| `/api/listings` | Top 20 cryptocurrencies by market cap | CoinMarketCap |
| `/api/trending` | Top 5 trending cryptocurrencies | CoinMarketCap |
| `/api/growing-24h` | Top gainers in 24 hours | CoinMarketCap |
| `/api/growing-week` | Top gainers in 7 days | CoinMarketCap |
| `/api/losing` | Top losers in 7 days | CoinMarketCap |
| `/api/social` | Social media metrics | CoinMarketCap |

## 🎯 Key Features Implementation

### Real-time Data Updates
- Automatic refresh every 30 seconds
- Error handling with fallback states
- Loading skeletons for better UX

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Touch-friendly interface elements

### Performance Optimization
- Server-side rendering with Next.js
- Image optimization with Next.js Image component
- Efficient state management with React hooks

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables
4. Deploy automatically

### Other Platforms
- **Netlify**: Compatible with Next.js static export
- **Railway**: Full-stack deployment
- **AWS**: Using Vercel or custom setup

## 🔑 Environment Variables

```env
NEXT_CMC_API_KEY=your_coinmarketcap_pro_api_key
```

Get your API key from [CoinMarketCap Pro](https://pro.coinmarketcap.com/)



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinMarketCap](https://coinmarketcap.com/) for providing comprehensive crypto data
- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives

## 📞 Support

If you have any questions or need help, please open an issue or contact the maintainers.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
