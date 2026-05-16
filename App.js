import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem("flashcards");

    return savedCards
      ? JSON.parse(savedCards)
      : [
          {
            id: 1,
            question: "What is Java?",
            answer: "Java is a programming language.",
          },
          {
            id: 2,
            question: "What is React?",
            answer: "React is a JavaScript library.",
          },
        ];
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    localStorage.setItem("flashcards", JSON.stringify(cards));
  }, [cards]);

  const nextCard = () => {
    if (currentIndex < cards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowAnswer(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setShowAnswer(false);
    }
  };

  const addOrUpdateCard = () => {
    if (question === "" || answer === "") return;

    if (editId) {
      const updatedCards = cards.map((card) =>
        card.id === editId
          ? { ...card, question, answer }
          : card
      );

      setCards(updatedCards);
      setEditId(null);
    } else {
      const newCard = {
        id: Date.now(),
        question,
        answer,
      };

      setCards([...cards, newCard]);
    }

    setQuestion("");
    setAnswer("");
  };

  const deleteCard = (id) => {
    const updatedCards = cards.filter(
      (card) => card.id !== id
    );

    setCards(updatedCards);
    setCurrentIndex(0);
  };

  const editCard = (card) => {
    setQuestion(card.question);
    setAnswer(card.answer);
    setEditId(card.id);
  };

  return (
    <div className="app">
      <h1>Flashcard Quiz App</h1>

      <div className="card">
        <h2>{cards[currentIndex].question}</h2>

        {showAnswer && (
          <p className="answer">
            {cards[currentIndex].answer}
          </p>
        )}

        <button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? "Hide Answer" : "Show Answer"}
        </button>

        <div className="navigation">
          <button onClick={prevCard}>Previous</button>

          <button onClick={nextCard}>Next</button>
        </div>

        <p>
          Card {currentIndex + 1} of {cards.length}
        </p>

        <div className="actions">
          <button onClick={() => editCard(cards[currentIndex])}>
            Edit
          </button>

          <button
            onClick={() =>
              deleteCard(cards[currentIndex].id)
            }
          >
            Delete
          </button>
        </div>
      </div>

      <div className="form">
        <h2>
          {editId ? "Edit Flashcard" : "Add Flashcard"}
        </h2>

        <input
          type="text"
          placeholder="Enter question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        <textarea
          placeholder="Enter answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        ></textarea>

        <button onClick={addOrUpdateCard}>
          {editId ? "Update Card" : "Add Card"}
        </button>
      </div>
    </div>
  );
}

export default App;