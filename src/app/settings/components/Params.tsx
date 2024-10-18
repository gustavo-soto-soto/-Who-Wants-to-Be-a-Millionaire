"use client";

import { ICategory } from "@/interfaces/ICategory";
import styles from "../page.module.css";
import React, { useEffect, useState } from "react";

interface ParamsComponentProps {
  categories: ICategory[];
}

const Params: React.FC<ParamsComponentProps> = ({ categories = [] }) => {
  const [category, setCategory] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("easy");
  const [name, setName] = useState<string>("Player");
  const [isMounted, setIsMounted] = useState(false);

  const changeParam = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  useEffect(() => {
    try {
      setIsMounted(true)
      const localCategory = localStorage.getItem("category");
      const localDifficulty = localStorage.getItem("difficulty");
      const localName = localStorage.getItem("name");

      if (localCategory) setCategory(localCategory);
      if (localDifficulty) setDifficulty(localDifficulty);
      if (localName) setName(localName);
    } catch (error) {
      console.error(error);
    }
  }, []);

  if (!isMounted) return null

  return (
    <div className={styles["params-container"]}>
      <div className={styles["option-container"]}>
        <label htmlFor="category">Questions category</label>
        <select
          name="category"
          id="category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            changeParam("category", e.target.value);
          }}
        >
          <option value="">Any</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className={styles["option-container"]}>
        <label htmlFor="difficulty">Difficulty</label>
        <select
          name="difficulty"
          id="difficulty"
          value={difficulty}
          onChange={(e) => {
            setDifficulty(e.target.value);
            changeParam("difficulty", e.target.value);
          }}
        >
          <option value={"easy"}>Easy</option>
          <option value={"medium"}>Medium</option>
          <option value={"hard"}>Hard</option>
        </select>
      </div>
      <div className={styles["option-container"]}>
        <label htmlFor="name">Player name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          autoComplete="off"
          placeholder="Enter player name..."
          onChange={(e) => {
            setName(e.target.value);
            changeParam("name", e.target.value);
          }}
        />
      </div>
    </div>
  );
};

export default Params;
