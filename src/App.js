import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const cardList = [
    { src: "/img/photo-1.jpg", matched: false },
    { src: "/img/photo-2.jpg", matched: false },
    { src: "/img/photo-3.jpg", matched: false },
    { src: "/img/photo-4.jpg", matched: false },
    { src: "/img/photo-5.jpg", matched: false },
    { src: "/img/photo-6.jpg", matched: false },
  ];

  const shuffleCards = () => {
    const shuffledCards = [...cardList, ...cardList]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurn(0);
  };

  // handle choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });

        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() => {
    shuffleCards();
  }, []);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };

  const handleChange = () => {
    shuffleCards();
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={handleChange}>New Game</button>
      <p>Turn: {turn}</p>

      {cards && (
        <div className="cards_grid">
          {cards.map((card) => (
            <Card
              handleChoice={handleChoice}
              key={card.id}
              card={card}
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
