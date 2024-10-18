"use client";

import styles from "../page.module.css";
import { useGame } from "../gameProvider";

const StatusSidebar = () => {
  const { awards, currentAward } = useGame();

  return (
    <>
      <ul className={styles["award-list"]}>
        {awards.map((award, index) => {
          return (
            <li
              key={award}
              style={
                currentAward === index
                  ? { background: "yellow", color: "black" }
                  : { color: "white" }
              }
            >
              <span>{index + 1}. </span>
              <span>${award}</span>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default StatusSidebar;
