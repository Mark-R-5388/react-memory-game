import { useState } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [turn, setTurn] = useState(0);

  const cardList = [
    { src: "/img/photo-1.jpg" },
    { src: "/img/photo-2.jpg" },
    { src: "/img/photo-3.jpg" },
    { src: "/img/photo-4.jpg" },
    { src: "/img/photo-5.jpg" },
    { src: "/img/photo-6.jpg" },
  ];

  const shuffleCards = () => {
    const shuffledCards = [...cardList, ...cardList]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setTurn(0);
  };

  const handleChange = () => {
    shuffleCards();
  };

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <button onClick={handleChange}>New Game</button>

      {cards && (
        <div className="cards_grid">
          {cards.map((card) => (
            <div className="card" key={card.id}>
              <div>
                <img
                  className="card_front"
                  src={card.src}
                  alt="front of card"
                />
                <img
                  className="card_back"
                  src="/img/cover.jpg"
                  alt="back of card"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
