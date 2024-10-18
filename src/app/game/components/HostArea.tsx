"use client";

import Image from "next/image";
import styles from "../page.module.css";
import { useGame } from "../gameProvider";
import { GameStates } from "@/enums/GameStates";
import Host from "@/assets/images/host.png";
import HostRight from "@/assets/images/host-right.png";
import HostFail from "@/assets/images/host-fail.png";
import HostWildCard from "@/assets/images/host-wildcard.png";
import HostEnd from "@/assets/images/host-end.png";

const HostImage = ( { state }: {state: string}) => {
  switch (state) {
    case GameStates.Right:
      return <Image src={HostRight} fill alt="host image" />;
    case GameStates.Fail:
      return <Image src={HostFail} fill alt="host image" />;
    case GameStates.Wildcard:
      return <Image src={HostWildCard} fill alt="host image" />;
    case GameStates.End:
      return <Image src={HostEnd} fill alt="host image" />;
    default:
      return <Image src={Host} fill alt="host image" />;
  }
};

const HostArea = () => {
  const { loading, gameState } = useGame();

  if (loading) return null;

  return (
    <div className={styles["host-area"]} custom-state={gameState}>
      <HostImage state={gameState}/>
    </div>
  );
};

export default HostArea;
