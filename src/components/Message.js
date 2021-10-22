export const Message = ({ message, setRestart }) => {
  return (
    <div className="message">
      <div>{message}</div>
      {message && (
        <button onClick={() => setRestart((e) => !e)}>Play again</button>
      )}
    </div>
  );
};
