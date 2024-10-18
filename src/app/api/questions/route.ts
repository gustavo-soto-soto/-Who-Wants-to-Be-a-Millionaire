import { TriviaCodes } from "@/enums/TriviaCodes";
import ITriviaResponse from "@/interfaces/ITriviaResponse";
import axios, { AxiosError, AxiosResponse } from "axios";
import { NextRequest, NextResponse } from "next/server";

const TRIVIA_API_URL: string = process.env.NEXT_PUBLIC_TRIVIA_API_URL || "";

export async function GET(req: NextRequest) {
  try {
    const { url = "" } = req;

    const { searchParams } = new URL(url);

    const params = Array.from(searchParams.entries());

    const triviaURL = new URL(`${TRIVIA_API_URL}/api.php`);

    for (const [key, value] of params) {
      if (!value) continue;
      triviaURL.searchParams.append(key, value);
    }

    const response: AxiosResponse<ITriviaResponse> = await axios.get(
      triviaURL.toString()
    );

    const { response_code, results } = response.data;

    if (response_code !== TriviaCodes.Success) {
      return NextResponse.json(null, {
        status: response.status,
        statusText: `${TriviaCodes[response_code]} code ${response_code}`,
      });
    }

    return NextResponse.json(
      {
        results,
        response_code,
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
