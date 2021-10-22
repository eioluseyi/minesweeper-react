import { useEffect, useState } from "react";

export const Square = ({
  data,
  it: { value: item, shouldClick },
  checkSquare,
  setMatches,
  isGameOver,
  setIsGameOver,
  ...props
}) => {
  const [itemClass, setItemClass] = useState([item, `_${data}`]);
  const [itemValue, setItemValue] = useState("");

  const click = () => {
    if (isGameOver) return;
    if (itemClass.includes("checked") || itemClass.includes("flag")) return;
    if (item === "bomb") {
      setIsGameOver(true);
    } else {
      if (data !== 0) {
        setItemClass((prev) => [...prev, "checked"]);
        setItemValue(data);
        return;
      }
      checkSquare();
      setItemClass((prev) => [...prev, "checked"]);
    }
  };

  const addFlag = (e) => {
    e.preventDefault();
    if (!itemClass.includes("checked")) {
      if (!itemClass.includes("flag")) {
        setItemClass((prev) => [...prev, "flag"]);
        setItemValue("🚩");
        if (itemClass.includes("bomb")) {
          setMatches((prev) => prev + 1);
        }
      } else {
        setItemClass((prev) =>
          [...prev].filter((cl) => {
            return cl !== "flag";
          })
        );
        setItemValue("");
        if (itemClass.includes("bomb")) {
          setMatches((prev) => prev - 1);
        }
      }
    }
  };

  useEffect(() => shouldClick && click(), [shouldClick]);
  useEffect(() => {
    if (isGameOver && item === "bomb") {
      setItemValue("💣");
      setItemClass((prev) => [...prev, "active"]);
    }
  }, [isGameOver]);

  return (
    <div
      data={data}
      className={itemClass.reduce((a, b) => a + " " + b, "")}
      onClick={click}
      onContextMenu={addFlag}
      {...props}
    >
      {itemValue}
    </div>
  );
};
