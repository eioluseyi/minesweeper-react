import { useEffect, useState } from "react";
import { Grid } from "./Grid";
import { Message } from "./Message";

export const Game = () => {
  const [message, setMessage] = useState("");
  const [restart, setRestart] = useState(true);

  useEffect(() => {
    if (!restart) {
      setRestart(true);
      setMessage("");
    }
  }, [restart]);

  return (
    <>
      {restart && <Grid setMessage={setMessage} />}
      <Message message={message} setRestart={setRestart} />
    </>
  );
};
