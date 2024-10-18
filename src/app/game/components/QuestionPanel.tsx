'use client'

import axios, { AxiosResponse } from "axios"
import { useGame } from "../gameProvider"
import { useRouter } from "next/navigation"
import React, { useEffect, useState } from "react"
import IQuestion from "@/interfaces/IQuestion"
import styles from '../page.module.css'
import loaderStyles from "../../page.module.css"
import ITriviaResponse from "@/interfaces/ITriviaResponse"
import IAnswer from "@/interfaces/IAnswer"
import shuffleArray from "@/scripts/shuffleArray"
import AudioPlayer from "@/scripts/AudioPlayer"
import formatHTML from "@/scripts/formatHTML"
import { GameStates } from "@/enums/GameStates"
import { WildCards } from "@/enums/WildCards"
import PublicOpinion from "./widgets/PublicOpinion"
import Congratulations from "./widgets/Congratulations"

const QuestionPanel = () => {

  const { params, nextAward, loading, handleLoading, handleGameState, usingWildCard, handleWildCard, currentAward, gameState} = useGame()
  const router = useRouter()

  const [questions, setQuestions] = useState<IQuestion[] | []>([])
  const [current, setCurrent] = useState<number>(0)
  const [answers, setAnswers] = useState<IAnswer[] | []>([])
  const [selectedLetter, setSelectedLetter] = useState<string>("")
  const [correct, setCorrect] = useState<boolean>(false)

  const letters = ['A', 'B', 'C', 'D'] as const;
  const [correctLetter, setCorrectLetter] = useState<(typeof letters)[number] | undefined>(undefined);

  const currentQuestion: IQuestion | undefined = questions[current]

  const getQuestions = async() => {
    try {

      handleLoading(true)

      const response: AxiosResponse<ITriviaResponse> = await axios.get("/api/questions", { params } )
      const { results, response_code } = response.data
      
      results.forEach( question => question.question = formatHTML(question.question) ) //decode encrpyt question content
      setQuestions(results)

      getAnswers(results[0])

    } catch (error) {
      console.error(error)

    } finally{
      handleLoading(false)
    }
  }

  const nextQuestion = (passQuestion=false) => {
    try {

      setCorrect(false)
      setSelectedLetter("")
      setCorrectLetter(undefined)
      handleGameState(GameStates.Normal)

      const updatedQuestions = questions.slice(1) //remove current question

      if (updatedQuestions.length === 0){
        return getQuestions()
      }

      setQuestions(updatedQuestions)
      getAnswers(updatedQuestions[0])
      
      if (!passQuestion) nextAward()
      
    } catch (error) {
      console.error(error)
    }
  }

  const getAnswers = (question: IQuestion | null) => {
    try {
      setCurrent(0)

      const currentQuestion = question || questions[0]
      const arrAnswers = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer] 
      const randomPositions = shuffleArray(arrAnswers)

      const formatAnswers: IAnswer[] = randomPositions.map( (answer, index) => (
        {
          answer: formatHTML(answer), //decode encrpyt answer content
          letter: letters[index],
          correct: answer === currentQuestion.correct_answer,
          hidden: false
        }
      ))

      setAnswers(formatAnswers)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const answerLetter = e.currentTarget.value
      const answer = answers.find(answer => answer.letter === answerLetter)

      setSelectedLetter(answerLetter)

      if (answer?.correct){
        new AudioPlayer().correct()
        setCorrect(true)
        if (currentAward+1 === 15){
          return nextQuestion()
        }
        handleGameState(GameStates.Right)
      }
      else{
        new AudioPlayer().wrong()
        setCorrect(false)
        handleGameState(GameStates.Fail)
      }

    } catch (error) {
      console.error(error)
    }
  }

  const handleUsingWildCard = () => {
    switch (usingWildCard) {
      case WildCards.FiftyFifty:
        const incorrectAnswers = answers.filter(answer => !answer.correct);

        const updatedAnswers = answers.map(answer => {
          if (!answer.correct && incorrectAnswers.indexOf(answer) < 2) {
            return { ...answer, hidden: true }; // set two anwers hidden
          }
          return answer; 
        });

        setAnswers(updatedAnswers);
        break;
      
      case WildCards.PassQuestion:
        nextQuestion(true)
        break

      case WildCards.PublicOpinion:
        const foundAnswer = answers.find(answer => answer.correct);
        const newCorrectLetter = foundAnswer?.letter ?? 'A';
        //set valid letter A | B | C | D
        if (letters.includes(newCorrectLetter as (typeof letters)[number])) {
          setCorrectLetter(newCorrectLetter as (typeof letters)[number]);
        }
        break;
    }
    handleWildCard(undefined)
  }

  useEffect( () => {
    if (usingWildCard){
      handleUsingWildCard()
    }
  }, [usingWildCard])

  useEffect( () => {
    new AudioPlayer().letsPlay()
    getQuestions()
  }, [])

  if (loading) return <span className={loaderStyles["loader"]}></span>
  
  if (gameState === GameStates.End) return (
    <Congratulations />
  )

  return (
    <div className={styles["question-panel"]}>
      <div className={styles["question-container"]}>
        <div className={styles["question-section"]}>
          <h2>{currentQuestion?.question ?? ""}</h2>
        </div>

        <ul className={styles["answers-section"]}>
          {answers.map((answer, index) => (
            <li key={`answer-${index + 1}`}>
              <button
                className={styles["answer-button"]}
                data-correct={answer.letter === selectedLetter ? answer.correct :
                  ( answer.correct && selectedLetter ? answer.correct : "" ) 
                } //apply background when is clicked
                value={answer.letter}
                onClick={handleClickAnswer}
                disabled={selectedLetter.length > 0 || answer.hidden}
              >
                {!answer.hidden &&
                  <>
                    <span className={styles["answer-letter"]}>
                      {answer.letter}:
                    </span>
                    <span className={styles["answer-response"]}>
                      {answer.answer}
                    </span>
                  </>
                }
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles["buttons-container"]}>
        <button 
          className={ correct ? styles["next-question-button"] : styles["finish-button"]}
          hidden={!selectedLetter}
          onClick={ () => { correct ? nextQuestion() : router.push("/") } }
        >
          {correct ? "Next question" : "Finish"}
        </button>
      </div>
      {
        correctLetter && <PublicOpinion correct={correctLetter} />
      }
    </div>
  );
}

export default QuestionPanel