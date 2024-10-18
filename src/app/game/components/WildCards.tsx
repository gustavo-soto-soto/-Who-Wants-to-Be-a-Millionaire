"use client";

import { useEffect, useState } from "react";
import styles from "../page.module.css";
import { useGame } from "../gameProvider";
import Image from "next/image";
import fiftyFifty from "@/assets/images/50-50.png";
import publicOpinion from "@/assets/images/public.png";
import passQuestion from "@/assets/images/pass.png";
import { WildCards as WildCardsEnum } from "@/enums/WildCards";
import { GameStates } from "@/enums/GameStates";
import AudioPlayer from "@/scripts/AudioPlayer";

const WildCards = () => {
  const [player, setPlayer] = useState<String>("");
  const { total, handleWildCard, gameState } = useGame();

  const [availableWildCards, setAvailableWildCards] = useState<WildCardsEnum[]>(
    [
      WildCardsEnum.FiftyFifty,
      WildCardsEnum.PublicOpinion,
      WildCardsEnum.PassQuestion,
    ]
  );

  const handleClickWildCard = (wildCard: WildCardsEnum) => {
    try {
      new AudioPlayer().wildcard()
      setAvailableWildCards(availableWildCards.filter(card => card !== wildCard))
      handleWildCard(wildCard)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const playerName = localStorage?.getItem("name") ?? "";
      setPlayer(playerName);
    }
  }, []);

  return (
    <div className={styles["wildCards-container"]}>
      <div className={styles["player-container"]}>
        <h1>{player}</h1>
        <h2>Total: ${total}</h2>
        <hr />
      </div>
      <div className={styles["cards-container"]} style={{display: gameState === GameStates.End ? "none" : ""}}>
        <button
          title="50/50"
          onClick={() => {
            handleClickWildCard(WildCardsEnum.FiftyFifty);
          }}
          disabled={!availableWildCards.includes(WildCardsEnum.FiftyFifty)}
          data-disabled={!availableWildCards.includes(WildCardsEnum.FiftyFifty)}
        >
          <Image
            src={fiftyFifty}
            fill
            alt="50/50 WildCard"
            className={styles["card-image"]}
          />
        </button>
        <button
          title="Public opinion"
          onClick={() => {
            handleClickWildCard(WildCardsEnum.PublicOpinion);
          }}
          disabled={!availableWildCards.includes(WildCardsEnum.PublicOpinion)}
          data-disabled={!availableWildCards.includes(WildCardsEnum.PublicOpinion)}
        >
          <Image
            src={publicOpinion}
            fill
            alt="public opinion WildCard"
            className={styles["card-image"]}
          />
        </button>
        <button
          title="Pass question"
          onClick={() => {
            handleClickWildCard(WildCardsEnum.PassQuestion);
          }}
          disabled={!availableWildCards.includes(WildCardsEnum.PassQuestion)}
          data-disabled={!availableWildCards.includes(WildCardsEnum.PassQuestion)}
        >
          <Image
            src={passQuestion}
            fill
            alt="pass question WildCard"
            className={styles["card-image"]}
          />
        </button>
      </div>
    </div>
  );
};

export default WildCards;
