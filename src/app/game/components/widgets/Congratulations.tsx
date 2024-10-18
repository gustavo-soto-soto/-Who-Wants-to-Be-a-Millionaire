"use client";

import styles from"@/app/game/page.module.css"
import { useGame } from "../../gameProvider";
import { useRouter } from "next/navigation"

const Congratulations = () => {
  const { total } = useGame();
  const router = useRouter()

  return (
    <div className={styles["congratulations-container"]}>
      <h1>Congratulations, you have won: ${total} !</h1>
      <div className={styles["buttons-container"]}>
        <button 
          className={styles["next-question-button"]}
          onClick={ () => { router.push("/") } }
        >
          Finish
        </button>
      </div>
    </div>
  );
};

export default Congratulations;
