import React from "react";

const Rules = () => {
  return (
    <div className="rules_box">
      <h3>Slot Machine Game Rules</h3>
      <ul>
        <li>
          <b>1)</b>If you match in 1 row, you get 50% extra of your bet.
        </li>
        <li>
          <b>2)</b>If you match in 2 rows, you get 100% extra of your bet.
        </li>
        <li>
          <b>2.1)</b>If your matched icons are the same in both rows, you get
          250% extra of your bet.
        </li>
        <li>
          <b>3)</b>If you match in 3 rows, you get 500% extra of your bet.
        </li>
        <li>
          <b>3.1)</b>If your matched icons are the same in all 3 rows, you win a
          lottery of 1 Crore!
        </li>
      </ul>
      <h3>Dice Betting Game Rules:</h3>
      <ul>
        <li>
          <b>1)</b>Choose your bet before throwing the dice: 8 to 12 (Over), 7,
          2 to 6 (Under)
        </li>
        <li>
          <b>2)</b>Winnings are multiplied by 2.3 for Over or Under predictions
          and by 5.8 for Equal to 7 prediction.
        </li>
        <li>
          <b>3)</b>Minimum stake amount is Rs. 30 and maximum is Rs. 148,275.7.
        </li>
      </ul>
    </div>
  );
};

export default Rules;
