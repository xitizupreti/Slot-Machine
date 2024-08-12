import React, { useState } from "react";
import SlotMachine from "./SlotMachine";
import DiceBetting from "./DiceBetting";
import Rules from "./Rules";
import "./index.css";

const App = () => {
  const [deposit, setDeposit] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [hasDeposited, setHasDeposited] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [showRules, setShowRules] = useState(false);

  const minBet = 30;
  const maxBet = 148275.7;

  const handleDepositChange = (e) => setDeposit(Number(e.target.value));

  const handleBetChange = (e) => setBetAmount(Number(e.target.value));

  const handleDepositSubmit = () => {
    if (deposit >= minBet) {
      setHasDeposited(true);
    } else {
      alert(`Please deposit at least Rs. ${minBet}`);
    }
  };

  const handlePlay = () => {
    if (betAmount < minBet || betAmount > maxBet) {
      alert(`Bet amount must be between Rs. ${minBet} and Rs. ${maxBet}.`);
      return;
    }

    if (betAmount > deposit) {
      alert(
        "Insufficient deposit. Please increase your deposit or lower your bet."
      );
      return;
    }

    const icons = ["➕", "❌", "✅"];
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

    let winnings = 0;
    if (currentSameIconMatches === 3) {
      winnings = betAmount * 5; // Example: win 5x for same icon match in all rows
    } else if (currentMatches === 3) {
      winnings = betAmount * 2; // Example: win 2x for all rows match
    } else if (currentMatches === 2) {
      winnings = betAmount; // Example: win 1x for 2 rows match
    }

    setTotalWinnings((prev) => prev + winnings);
    setResultMessage(
      winnings > 0
        ? `You won Rs. ${winnings.toFixed(2)}!`
        : "You lost. Better luck next time."
    );
  };

  const toggleRules = () => setShowRules(!showRules);

  return (
    <>
      <h1 className="heading_style">
        🎰 Welcome to
        <span style={{ fontWeight: "bold" }}> Slot Machine Game</span> 🎰
      </h1>
      <div className="slotmachine">
        <input
          type="number"
          placeholder={`Enter your deposit amount (Rs. ${minBet} - Rs. ${maxBet})`}
          value={deposit}
          onChange={handleDepositChange}
        />
        <button className="button_style" onClick={handleDepositSubmit}>
          Deposit
        </button>
        {hasDeposited && (
          <>
            <input
              type="number"
              placeholder={`Enter your bet amount (Rs. ${minBet} - Rs. ${maxBet})`}
              value={betAmount}
              onChange={handleBetChange}
            />
            <div>
              <button
                className="button_style"
                onClick={() => handleBetChange({ target: { value: minBet } })}
              >
                MIN
              </button>
              <button
                className="button_style"
                onClick={() =>
                  handleBetChange({ target: { value: betAmount / 2 } })
                }
              >
                x/2
              </button>
              <button
                className="button_style"
                onClick={() =>
                  handleBetChange({ target: { value: betAmount * 2 } })
                }
              >
                x*2
              </button>
              <button
                className="button_style"
                onClick={() => handleBetChange({ target: { value: maxBet } })}
              >
                MAX
              </button>
            </div>
            <button className="button_style" onClick={handlePlay}>
              Play
            </button>
            <SlotMachine betAmount={betAmount} />
            <h2
              style={{ color: resultMessage.includes("won") ? "green" : "red" }}
            >
              {resultMessage}
            </h2>
            <h2>Total Winnings: Rs. {totalWinnings.toFixed(2)}</h2>
          </>
        )}
      </div>

      <DiceBetting isVisible={hasDeposited} />

      <button className="rules_button" onClick={toggleRules}>
        Rules
      </button>

      {showRules && <Rules />}
    </>
  );
};

export default App;
