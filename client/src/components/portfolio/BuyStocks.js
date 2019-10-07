import React from "react";
import { Row, Button } from "reactstrap";
import { useSelector } from "react-redux";

export const BuyStocks = () => {
  const { cash } = useSelector(state => state.auth.user);
  return (
    <div style={{ paddingLeft: "3rem" }}>
      <Row>
        <span>Cash - ${cash}</span>
      </Row>
      <Row>
        <input placeholder="Ticker" />
      </Row>
      <Row>
        <input placeholder="Qty" />
      </Row>
      <Row>
        <Button color="primary">Buy</Button>
      </Row>
    </div>
  );
};
