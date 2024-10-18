import ITriviaTokenResponse from "@/interfaces/ITriviaTokenResponse";
import axios, { AxiosResponse } from "axios";
import { redirect } from "next/navigation";
import QuestionPanel from "./components/QuestionPanel";
import { GameProvider } from "./gameProvider";
import styles from "./page.module.css";
import StatusSidebar from "./components/StatusSidebar";
import IQuestionRequest from "@/interfaces/IQuestionRequest";
import WildCards from "./components/WildCards";
import HostArea from "./components/HostArea";

const TRIVIA_API_URL: string = process.env.NEXT_PUBLIC_TRIVIA_API_URL || "";

const getToken = async () => {
  try {
    const response: AxiosResponse<ITriviaTokenResponse> = await axios.get(
      `${TRIVIA_API_URL}/api_token.php?command=request`
    );
    const {
      data: { response_code, response_message, token },
    } = response;
    return token;
  } catch (error) {
    console.error(error);
    return "";
  }
};

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const token = await getToken();

  const params: IQuestionRequest = {
    amount: 20,
    category: searchParams?.category ?? "",
    difficulty: searchParams?.difficulty ?? "easy",
    type: "multiple",
    token,
  };

  if (!token) return redirect("/");

  return (
    <GameProvider params={params}>
      <div className={styles["game-container"]}>
        <div className={styles["host-question-container"]}>
          <HostArea />
          <QuestionPanel />
        </div>

        <div className={styles["status-sidebar"]}>
          <WildCards />
          <StatusSidebar />
        </div>
      </div>
    </GameProvider>
  );
}
