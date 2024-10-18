import Link from "next/link";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <div className={styles.main}>
      <div className={styles["credits-container"]}>
        <h1>Who Wants To be a Millonaire</h1>
        <h2>By Gustavo Soto Soto</h2>
        <p>This page was designed for demonstration purposes</p>
        <p>
          Questions and answers are taken from another service: {" "}
          <Link href={"https://opentdb.com/"} target="_blank" >
            https://opentdb.com
          </Link>
        </p>
        <p>
          Visit my portfolio to see more projects: {" "}
          <Link
            href={"https://gustavo-soto-soto.vercel.app/"}
            target="_blank"
          >
            gustavo-soto-soto.vercel.app
          </Link>
        </p>
        <p>
          Visit my Linkedin: {" "}
          <Link
            href={"https://www.linkedin.com/in/gustavo-soto-soto/"}
            target="_blank"
          >
            gustavo-soto-soto
          </Link>
        </p>
        <p>&copy; { new Date().getFullYear() } Dev Gustavo Soto Soto Costa Rica. All rights reserved.</p>
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
