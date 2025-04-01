import { getMetaData } from "@/lib/utils";
import axios from "axios"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': process.env.NEXT_CMC_API_KEY,
      },
      params: {
        start: 1,
        limit: 20,
        convert: 'USD',
        cryptocurrency_type: 'coins',
        sort: 'percent_change_7d',
        aux: 'volume_7d',
      }
    })
    const data = response.data.data
    // if (data && Array.isArray(data)) {
    //   for (let i = 0; i < data.length; i++) {
    //     const coinId = data[i].id;
    //     try {
    //       const metadata = await getMetaData(coinId);
    //       // Assuming getMetaData returns the logo URL or an object containing the logo
    //       if (typeof metadata === 'string') {
    //         data[i].logo = metadata;
    //       } else if (metadata && typeof metadata === 'object' && 'logo' in metadata) {
    //         data[i].logo = metadata.logo;
    //       } else {
    //         data[i].logo = null;
    //       }
    //     } catch (err) {
    //       console.error(`Error fetching metadata for coin ${coinId}:`, err);
    //       data[i].logo = null;
    //     }
    //   }
    // }
    return NextResponse.json(data)
  } catch (error) {
    console.error("All attempts to fetch trending coins failed:", error)

    // Return an error response instead of mock data
    return NextResponse.json(
      {
        status: {
          error_code: 500,
          error_message: "Failed to fetch trending coins data"
        },
        data: []
      },
      { status: 500 }
    )
  }
}
