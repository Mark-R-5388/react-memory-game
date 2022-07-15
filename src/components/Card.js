import "./Card.css";

const Card = ({ card, handleChoice, flipped, disabled }) => {
  const handleClick = (e) => {
    if (!disabled) {
      handleChoice(card);
    }
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="card_front" src={card.src} alt="front of card" />
        <img
          onClick={handleClick}
          className="card_back"
          src="/img/cover.jpg"
          alt="back of card"
        />
      </div>
    </div>
  );
};

export default Card;
