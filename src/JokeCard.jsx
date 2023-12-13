import { useEffect, useState } from "react";

export default function () {
  const [joke, setJoke] = useState();
  const [buttonText, setButtonText] = useState("Answer");
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch("https://v2.jokeapi.dev/joke/Programming?type=twopart")
      .then((response) => response.json())
      .then((obj) => setJoke(obj))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="joke">
      {joke === undefined ? <div>Loading...</div> : joke.setup}
      {joke !== undefined && (
        <button
          onClick={() => {
            if (buttonText === "Answer") {
              setShowAnswer(!showAnswer);
              setButtonText("Reload");
            } else {
              setShowAnswer(!showAnswer);
              fetch("https://v2.jokeapi.dev/joke/Programming?type=twopart")
                .then((response) => response.json())
                .then((obj) => setJoke(obj))
                .catch((error) => console.error(error));
              setButtonText("Answer");
              setShowAnswer(!showAnswer);
            }
          }}
        >
          {buttonText}
        </button>
      )}
      {showAnswer && <p>{joke.delivery}</p>}
    </div>
  );
}
