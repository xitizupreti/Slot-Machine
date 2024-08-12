import React, { useState } from "react";
import SlotM from "./SlotM";

const SlotMachine = ({ betAmount }) => {
  const [slots, setSlots] = useState([]);
  const [resultMessage, setResultMessage] = useState("");
  const icons = ["➕", "❌", "✅"];
  const minBet = 30;
  const maxBet = 148275.7;

  const handlePlay = () => {
    if (betAmount < minBet || betAmount > maxBet) {
      alert(`Bet amount must be between Rs. ${minBet} and Rs. ${maxBet}.`);
      return;
    }

    const newSlots = [];
    let currentMatches = 0;
    let currentSameIconMatches = 0;

    for (let i = 0; i < 3; i++) {
      const x = icons[Math.floor(Math.random() * icons.length)];
      const y = icons[Math.floor(Math.random() * icons.length)];
      const z = icons[Math.floor(Math.random() * icons.length)];

      newSlots.push({ x, y, z });

      if (x === y && y === z) {
        currentMatches++;
        if (x === "✅") currentSameIconMatches++;
      }
    }

    setSlots(newSlots);

    let winnings = 0;
    if (currentSameIconMatches === 3) {
      winnings = betAmount * 5;
    } else if (currentMatches === 3) {
      winnings = betAmount * 2;
    } else if (currentMatches === 2) {
      winnings = betAmount;
    }

    setResultMessage(
      winnings > 0
        ? `You won Rs. ${winnings.toFixed(2)}!`
        : "You lost. Better luck next time."
    );
  };

  return (
    <>
      <button className="button_style" onClick={handlePlay}>
        Play
      </button>
      {slots.map((slot, index) => (
        <SlotM key={index} x={slot.x} y={slot.y} z={slot.z} />
      ))}
    </>
  );
};

export default SlotMachine;
