"use client"; // Error boundaries must be Client Components

import Link from "next/link";
import styles from "./page.module.css"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className={styles["error-container"]}>
      <h2>Something went wrong!</h2>
      <Link href={"/"} passHref>
        <h2>BACK</h2>
      </Link>
    </div>
  );
}
