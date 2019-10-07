import React from "react";
import { Row, Col } from "reactstrap";

import { PortfolioStocks } from "./PortfolioStocks";
import { BuyStocks } from "./BuyStocks";

export const Portfolio = () => {
  return (
    <div className="portfolio-container">
      <Row>
        <Col>
          <PortfolioStocks />
        </Col>
        <Col>
          <BuyStocks />
        </Col>
      </Row>
    </div>
  );
};
