import React, { useState, useEffect } from "react";
import { Row, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

import { loadUser } from "../../actions/authActions";
import { purchaseTransaction } from "../../actions/transactionActions";

export const BuyStocks = () => {
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [ticker, setTicker] = useState(null);
  const [qty, setQty] = useState(null);

  const onClick = () => {
    const userId = user.id || user._id;
    if (ticker && qty > 0) {
      dispatch(purchaseTransaction({ ticker, qty, userId }));
      setTimeout(() => {
        dispatch(loadUser());
      }, 1000);
    }
  };

  return (
    <div style={{ paddingLeft: "3rem" }}>
      <Row>
        <span>Cash - ${user.cash}</span>
      </Row>
      <Row>
        <input placeholder="Ticker" onChange={e => setTicker(e.target.value)} />
      </Row>
      <Row>
        <input
          placeholder="Qty"
          id="buy_qty"
          type="number"
          onChange={e => setQty(e.target.value)}
        />
      </Row>
      <Row>
        <Button color="primary" onClick={onClick}>
          Buy
        </Button>
      </Row>
    </div>
  );
};
