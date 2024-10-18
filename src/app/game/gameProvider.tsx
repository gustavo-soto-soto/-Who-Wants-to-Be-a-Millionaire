'use client'

import { GameStates } from '@/enums/GameStates';
import { WildCards } from '@/enums/WildCards';
import IQuestionRequest from '@/interfaces/IQuestionRequest';
import AudioPlayer from '@/scripts/AudioPlayer';
import { createContext, useContext, useState, ReactNode } from 'react';

export type GameContextType = {
  params: IQuestionRequest,
  awards: number[],
  total: number,
  currentAward: number,
  nextAward: () => void,
  loading: boolean,
  handleLoading: (state: boolean) => void,
  gameState: GameStates,
  handleGameState: (state: GameStates) => void,
  usingWildCard: WildCards | undefined,
  handleWildCard: (wildCard: WildCards | undefined) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

const GameProvider = ({ children, params }: { children: ReactNode, params: IQuestionRequest }) => {

  const [awards, setAwards] = useState<number[]>([
    100, 200, 300, 500, 1000, 2000, 4000, 8000,
    16000, 32000, 64000, 125000, 250000, 500000, 1000000
  ])

  const [total, setTotal] = useState<number>(0)
  const [currentAward, setCurrentAward] = useState<number>(0)
  const nextAward = () => {
    setTotal(awards[currentAward])
    if ( currentAward+1 === 15 ){
      setGameState(GameStates.End)
      new AudioPlayer().end()
      return
    }
    setCurrentAward( (currentAward) => currentAward+=1)
  }

  const [loading, setLoading] = useState<boolean>(false)
  const handleLoading = (state: boolean) => { setLoading(state) }

  const [gameState, setGameState] = useState<GameStates>(GameStates.Normal);
  const handleGameState = (state: GameStates) => { setGameState( state )  }

  const [usingWildCard, setUsingWildCard] = useState<WildCards | undefined>(undefined)
  const handleWildCard = (wildCard: WildCards | undefined) => {
    setUsingWildCard(wildCard)
  }
  
  return (
    <GameContext.Provider value={ { params, awards, total, currentAward, nextAward, loading, handleLoading, gameState, handleGameState, usingWildCard, handleWildCard } }>
      {children}
    </GameContext.Provider>
  );
};

const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within an GameProvider');
  }
  return context;
};

export { GameProvider, useGame };