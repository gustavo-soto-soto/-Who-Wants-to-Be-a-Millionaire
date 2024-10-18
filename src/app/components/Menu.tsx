"use client";

import styles from "../page.module.css";
import play from "../../assets/icons/play.svg";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Menu = () => {
  const [category, setCategory] = useState("")
  const [difficulty, setDifficulty] = useState("easy")

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const category = localStorage?.getItem("category") ?? ""
      const difficulty = localStorage?.getItem("difficulty") ?? "easy";
      setCategory(category)
      setDifficulty(difficulty)
    }
  }, []);

  return (
    <div className={styles.menu}>
      <ul>
        <Link href={"/settings"} style={{ textDecoration: "none" }}>
          <li>
            <span>SETTINGS</span>
          </li>
        </Link>
        <Link
          href={{
            pathname: "/game",
            query: {
              category,
              difficulty
            }
          }}
          style={{ textDecoration: "none" }}
        >
          <li className={styles.play}>
            <span>PLAY</span>
            <Image src={play} alt="play icon" width={20} height={20} />
          </li>
        </Link>
        <Link href={"/credits"} style={{ textDecoration: "none" }}>
          <li>
            <span>CREDITS</span>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Menu;
