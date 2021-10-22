import { useEffect, useState } from "react";
import { Square } from "./Square";

export const Grid = ({ setMessage }) => {
  let width = 10;
  let bombAmount = 20;

  // Shuffled array of bombs
  const bombsArray = Array(bombAmount).fill("bomb");
  const emptyArray = Array(width * width - bombAmount).fill("valid");
  const gameArray = emptyArray.concat(bombsArray);
  const shuffledArray = gameArray
    .sort(() => Math.random() - 0.5)
    .map((i) => ({ value: i, shouldClick: false }));

  const [matches, setMatches] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [finalArray, setFinalArray] = useState(shuffledArray);

  function recurse(fn, nid) {
    let arr = [...finalArray];
    arr[nid] = { ...arr[nid], shouldClick: true };
    fn(arr);
  }

  // check neighbouring squares
  const checkSquare = (id) => {
    const isLeftEdge = id % width === 0;
    const isRightEdge = id % width === width - 1;

    setTimeout(() => {
      if (id > 0 && !isLeftEdge) {
        const newId = id - 1;
        recurse(setFinalArray, newId);
      }
      if (id > 9 && !isRightEdge) {
        const newId = id + 1 - width;
        recurse(setFinalArray, newId);
      }
      if (id > 10) {
        const newId = id - width;
        recurse(setFinalArray, newId);
      }
      if (id > 11 && !isLeftEdge) {
        const newId = id - 1 - width;
        recurse(setFinalArray, newId);
      }
      if (id < 98 && !isRightEdge) {
        const newId = id + 1;
        recurse(setFinalArray, newId);
      }
      if (id < 90 && !isLeftEdge) {
        const newId = id - 1 + width;
        recurse(setFinalArray, newId);
      }
      if (id < 88 && !isRightEdge) {
        const newId = id + 1 + width;
        recurse(setFinalArray, newId);
      }
      if (id < 89) {
        const newId = id + width;
        recurse(setFinalArray, newId);
      }
    }, 10);
  };

  useEffect(() => {
    if (isGameOver) {
      setMessage("BOOM! Game Over!");
    }
  }, [isGameOver]);

  useEffect(() => {
    if (matches === bombAmount) {
      setMessage("You Win!");
    }
  }, [matches]);

  return (
    <div className="grid">
      {finalArray.map((item, i) => {
        // add number indicators
        let total = 0;

        const isLeftEdge = i % width === 0;
        const isRightEdge = i % width === width - 1;

        if (finalArray[i]?.value === "valid") {
          if (i > 0 && !isLeftEdge && finalArray[i - 1]?.value === "bomb")
            total++;
          if (
            i > 9 &&
            !isRightEdge &&
            finalArray[i + 1 - width]?.value === "bomb"
          )
            total++;
          if (i > 10 && finalArray[i - width]?.value === "bomb") total++;
          if (
            i > 11 &&
            !isLeftEdge &&
            finalArray[i - 1 - width]?.value === "bomb"
          )
            total++;
          if (i < 98 && !isRightEdge && finalArray[i + 1]?.value === "bomb")
            total++;
          if (
            i < 90 &&
            !isLeftEdge &&
            finalArray[i - 1 + width]?.value === "bomb"
          )
            total++;
          if (
            i < 88 &&
            !isRightEdge &&
            finalArray[i + 1 + width]?.value === "bomb"
          )
            total++;
          if (i < 89 && finalArray[i + width]?.value === "bomb") total++;
        }

        return (
          <Square
            key={i}
            it={item}
            data={total}
            setMatches={setMatches}
            isGameOver={isGameOver}
            setIsGameOver={setIsGameOver}
            checkSquare={() => checkSquare(i)}
          />
        );
      })}
    </div>
  );
};
