import React, { useState } from "react";

const SlotM = ({ x, y, z }) => {
  const isMatch = x === y && y === z;

  return (
    <div className="slot_inner">
      <h1>
        {x} {y} {z}
      </h1>
      <h1>{isMatch ? "This is matching" : "This is not matching"}</h1>
      <hr />
    </div>
  );
};

const App = () => {
  const [deposit, setDeposit] = useState(0);
  const [betAmount, setBetAmount] = useState(0);
  const [matches, setMatches] = useState(0);
  const [sameIconMatches, setSameIconMatches] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [slots, setSlots] = useState([]);
  const [hasDeposited, setHasDeposited] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [showRules, setShowRules] = useState(false);

  const icons = ["➕", "❌", "✅", "💖"];
  const minBet = 30;
  const maxBet = 148275.7;

  const handleDepositChange = (e) => setDeposit(Number(e.target.value));

  const handleBetChange = (e) => setBetAmount(Number(e.target.value));

  const handleBetOption = (option) => {
    let newBetAmount;
    switch (option) {
      case "MIN":
        newBetAmount = minBet;
        break;
      case "MAX":
        newBetAmount = maxBet;
        break;
      case "HALF":
        newBetAmount = Math.max(minBet, Math.floor(deposit / 2));
        break;
      case "DOUBLE":
        newBetAmount = Math.min(maxBet, betAmount * 2);
        break;
      default:
        break;
    }
    setBetAmount(newBetAmount);
    console.log(`Bet Amount set to: Rs. ${newBetAmount}`); // Debugging line
  };

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

    setMatches(0);
    setSameIconMatches(0);

    const newSlots = [];
    let currentMatches = 0;
    let currentSameIconMatches = 0;

    for (let i = 0; i < 3; i++) {
      const x = icons[Math.floor(Math.random() * icons.length)];
      const y = icons[Math.floor(Math.random() * icons.length)];
      const z = icons[Math.floor(Math.random() * icons.length)];

      newSlots.push({ x, y, z });

      if (x === y && y === z) {
        currentMatches += 1;
        currentSameIconMatches += 1;
      }
    }

    setMatches(currentMatches);
    setSameIconMatches(currentSameIconMatches);
    setSlots(newSlots);

    calculateWinnings(currentMatches, currentSameIconMatches);
  };

  const calculateWinnings = (matches, sameIconMatches) => {
    let winnings = 0;

    if (matches === 1) {
      winnings = betAmount * 1.5;
    } else if (matches === 2) {
      winnings = betAmount * 2;
      if (sameIconMatches === 2) {
        winnings = betAmount * 3.5;
      }
    } else if (matches === 3) {
      winnings = betAmount * 5;
      if (sameIconMatches === 3) {
        winnings = "1 Crore";
      }
    }

    if (winnings === "1 Crore") {
      setTotalWinnings("1 Crore");
      setResultMessage(`🎉 You won a lottery of 1 Crore! 🎉`);
    } else if (winnings > 0) {
      setTotalWinnings((prevWinnings) => prevWinnings + winnings);
      setDeposit((prevDeposit) => prevDeposit + winnings - betAmount);
      setResultMessage(`You win Rs. ${winnings}`, "green");
    } else {
      setDeposit((prevDeposit) => prevDeposit - betAmount);
      setResultMessage(`You lost Rs. ${betAmount}`, "red");
    }
  };

  const toggleRules = () => {
    setShowRules(!showRules);
  };

  return (
    <>
      <h1 className="heading_style">
        🎰 Welcome to
        <span style={{ fontWeight: "bold" }}>Slot Machine Game</span> 🎰
      </h1>
      <div className="slotmachine">
        {!hasDeposited ? (
          <>
            <input
              type="number"
              placeholder="Enter deposit amount"
              value={deposit}
              onChange={handleDepositChange}
            />
            <button type="button" onClick={handleDepositSubmit}>
              Submit Deposit
            </button>
          </>
        ) : (
          <>
            <h2>Deposit: Rs. {deposit}</h2>
            <input
              type="number"
              placeholder={`Enter your bet amount (Rs. ${minBet} - Rs. ${maxBet})`}
              value={betAmount}
              onChange={handleBetChange}
            />
            <div>
              <button onClick={() => handleBetOption("MIN")}>MIN</button>
              <button onClick={() => handleBetOption("MAX")}>MAX</button>
              <button onClick={() => handleBetOption("HALF")}>x/2</button>
              <button onClick={() => handleBetOption("DOUBLE")}>x*2</button>
            </div>
            <button type="button" onClick={handlePlay}>
              Play!
            </button>

            {slots.map((slot, index) => (
              <SlotM key={index} x={slot.x} y={slot.y} z={slot.z} />
            ))}

            <br />
            <h2
              style={{
                color: resultMessage.includes("win") ? "green" : "red",
              }}
            >
              {resultMessage}
            </h2>
            <h2>
              Total Winnings:{" "}
              {totalWinnings === "1 Crore"
                ? `🎉 1 Crore! 🎉`
                : `Rs. ${totalWinnings}`}
            </h2>
          </>
        )}
      </div>

      <button
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          padding: "5px 10px",
          cursor: "pointer",
          zIndex: 1000,
        }}
        onClick={toggleRules}
      >
        Rules
      </button>

      {showRules && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            right: "10px",
            width: "300px",
            padding: "10px",
            backgroundColor: "white",
            border: "1px solid #ccc",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
          }}
        >
          <h3>Game Rules</h3>
          <ul>
            <li>
              <b>1.</b>If you match in 1 row, you get 50% extra of your bet.
            </li>
            <li>
              <b>2.</b> If you match in 2 rows, you get 100% extra of your bet.
            </li>
            <li>
              <b>2.1</b> If your matched icons are the same in both rows, you
              get 250% extra of your bet.
            </li>
            <li>
              <b>3.</b> If you match in 3 rows, you get 500% extra of your bet.
            </li>
            <li>
              <b>3.1</b> If your matched icons are the same in all 3 rows, you
              win a lottery of 1 Crore!
            </li>
          </ul>
          <button
            onClick={toggleRules}
            style={{ marginTop: "10px", cursor: "pointer" }}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default App;
