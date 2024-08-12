import React, { useState } from "react";

const DiceBetting = ({ isVisible }) => {
  const [diceResult, setDiceResult] = useState(null);
  const [betChoice, setBetChoice] = useState("");
  const [stakeAmount, setStakeAmount] = useState(0);
  const [resultMessage, setResultMessage] = useState("");
  const minStake = 30;
  const maxStake = 148275.7;

  const handleBetChange = (e) => setStakeAmount(Number(e.target.value));

  const handleBetChoice = (choice) => {
    setBetChoice(choice);
  };

  const rollDice = () => {
    const die1 = Math.floor(Math.random() * 6) + 1;
    const die2 = Math.floor(Math.random() * 6) + 1;
    const sum = die1 + die2;

    let winnings = 0;
    let message = "";

    if (stakeAmount < minStake || stakeAmount > maxStake) {
      message = `Stake amount must be between Rs. ${minStake} and Rs. ${maxStake}.`;
    } else {
      if (betChoice === "Over" && sum >= 8) {
        winnings = stakeAmount * 2.3;
        message = `You win Rs. ${winnings.toFixed(2)}! 🎉`;
      } else if (betChoice === "Under" && sum <= 6) {
        winnings = stakeAmount * 2.3;
        message = `You win Rs. ${winnings.toFixed(2)}! 🎉`;
      } else if (betChoice === "Equal" && sum === 7) {
        winnings = stakeAmount * 5.8;
        message = `You win Rs. ${winnings.toFixed(2)}! 🎉`;
      } else {
        message = `You lost Rs. ${stakeAmount.toFixed(2)}. 😢`;
      }

      setDiceResult(`Dice rolled: ${die1} + ${die2} = ${sum}`);
    }

    setResultMessage(message);
  };

  const handleBetOption = (option) => {
    let newStakeAmount;
    switch (option) {
      case "MIN":
        newStakeAmount = minStake;
        break;
      case "MAX":
        newStakeAmount = maxStake;
        break;
      case "HALF":
        newStakeAmount = Math.max(minStake, Math.floor(stakeAmount / 2));
        break;
      case "DOUBLE":
        newStakeAmount = Math.min(maxStake, stakeAmount * 2);
        break;
      default:
        break;
    }
    setStakeAmount(newStakeAmount);
  };

  return (
    isVisible && (
      <div className="dice_betting">
        <h2>Dice Betting Game</h2>
        <input
          type="number"
          placeholder={`Enter your stake amount (Rs. ${minStake} - Rs. ${maxStake})`}
          value={stakeAmount}
          onChange={handleBetChange}
        />
        <div>
          <button
            className="button_style"
            onClick={() => handleBetChoice("Over")}
          >
            Bet on Over (8-12)
          </button>
          <button
            className="button_style"
            onClick={() => handleBetChoice("Under")}
          >
            Bet on Under (2-6)
          </button>
          <button
            className="button_style"
            onClick={() => handleBetChoice("Equal")}
          >
            Bet on Equal to 7
          </button>
        </div>
        <div>
          <button
            className="button_style"
            onClick={() => handleBetOption("MIN")}
          >
            MIN
          </button>
          <button
            className="button_style"
            onClick={() => handleBetOption("HALF")}
          >
            x/2
          </button>
          <button
            className="button_style"
            onClick={() => handleBetOption("DOUBLE")}
          >
            x*2
          </button>
          <button
            className="button_style"
            onClick={() => handleBetOption("MAX")}
          >
            MAX
          </button>
        </div>
        <button className="button_style" onClick={rollDice}>
          Roll Dice
        </button>
        {diceResult && <h3>{diceResult}</h3>}
        <h3 style={{ color: resultMessage.includes("win") ? "green" : "red" }}>
          {resultMessage}
        </h3>
      </div>
    )
  );
};

export default DiceBetting;
