import axios, { AxiosResponse } from "axios";
import styles from "./page.module.css";
import { ICategory, ICategoryResponse } from "@/interfaces/ICategory";
import Link from "next/link";
import Params from "./components/Params";

const TRIVIA_API_URL: string = process.env.NEXT_PUBLIC_TRIVIA_API_URL || ""

const getCategories = async () => {
  try {
    const response: AxiosResponse<ICategoryResponse> = await axios.get(`${TRIVIA_API_URL}/api_category.php`)
    const { trivia_categories } = response.data
    return trivia_categories
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default async function Home() {
  const categories: ICategory[] = await getCategories();

  return (
    <div className={styles.main}>
      <div className={styles["settings-container"]}>
        <h1>General settings</h1>
        <Params categories={categories} />
        <div className={styles["actions-container"]}>
          <Link href={"/"} passHref>
            <button className={styles["back-button"]}>
              Go back
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
