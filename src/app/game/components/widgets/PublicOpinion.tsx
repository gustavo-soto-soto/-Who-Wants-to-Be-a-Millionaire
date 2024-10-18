import { useEffect, useState } from 'react';
import styles from '../../page.module.css';

interface Percentages {
  A: number;
  B: number;
  C: number;
  D: number;
}

/* correct: keyof percentages: This means that the correct variable can only take one
 of the values ​​'A', 'B', 'C', or 'D', since those are the keys defined in the Percents interface. */

const PublicOpinion = ({ correct }: { correct: keyof Percentages }) => {
  const [percentages, setPercentages] = useState<Percentages>({ A: 0, B: 0, C: 0, D: 0 });

  useEffect(() => {
    generatePercentages();
  }, [correct]);

  const generatePercentages = () => {
    const options: Array<keyof Percentages> = ['A', 'B', 'C', 'D'];
    const correctIndex = options.indexOf(correct);
  
    // Generates a high value for the correct answer
    const correctPercentage = Math.floor(Math.random() * 21) + 50; // 50-70%
    let remainingPercentage = 100 - correctPercentage;
  
    // Generates random percentages for other options
    let otherPercentages = options.filter(option => option !== correct).map(() => {
      return Math.floor(Math.random() * remainingPercentage);
    });

    // Adjust other percentages to ensure they add up correctly
    let sumOtherPercentages = otherPercentages.reduce((acc, val) => acc + val, 0);
    if (sumOtherPercentages > 0) {
      otherPercentages = otherPercentages.map(p => (p / sumOtherPercentages) * remainingPercentage);
    } else {
      // If all random values are 0, assign equal share
      const equalShare = Math.floor(remainingPercentage / (otherPercentages.length || 1));
      otherPercentages = otherPercentages.map(() => equalShare);
    }

    // Create a new percentages object
    const newPercentages: Percentages = {
      A: correctIndex === 0 ? correctPercentage : Math.round(otherPercentages[0] || 0),
      B: correctIndex === 1 ? correctPercentage : Math.round(otherPercentages[1] || 0),
      C: correctIndex === 2 ? correctPercentage : Math.round(otherPercentages[2] || 0),
      D: correctIndex === 3 ? correctPercentage : Math.round(otherPercentages[3] || 0),
    };

    // Ensure total is 100
    const total = Object.values(newPercentages).reduce((acc, val) => acc + val, 0);
    if (total !== 100) {
      console.warn("Total percentages do not add up to 100", newPercentages);
    }

    setPercentages(newPercentages);
  };

  const barMaxHeight = 200; // Altura máxima en píxeles

  return (
    <div className={styles["opinion-container"]}>
      {Object.keys(percentages).map((option) => (
        <div key={option} className={styles["opinion-bar-container"]}>
          <div
            className={styles["opinion-bar"]}
            style={{ height: `${(percentages[option as keyof Percentages] / 100) * barMaxHeight}px` }}
          >
            <span>{percentages[option as keyof Percentages]}%</span>
          </div>
          <div className="opinion-label">{option}</div>
        </div>
      ))}
    </div>
  );
};

export default PublicOpinion;
