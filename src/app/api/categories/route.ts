import { ICategoryResponse } from "@/interfaces/ICategory";
import axios, { AxiosError, AxiosResponse } from "axios";
import { NextResponse } from "next/server";

const TRIVIA_API_URL: string = process.env.NEXT_PUBLIC_TRIVIA_API_URL || "";

export async function GET() {
  try {
    const categoriesURL = new URL(`${TRIVIA_API_URL}/api_category.php`);

    const response: AxiosResponse<ICategoryResponse> = await axios.get(
      categoriesURL.toString()
    );

    const { trivia_categories } = response.data;
    
    return NextResponse.json(
      {
        trivia_categories
      },
      {
        status: 200,
      }
    );

  } catch (error: any) {
    console.error(error);
    return NextResponse.json(null, { status: 500, statusText: error.message });
  }
}
