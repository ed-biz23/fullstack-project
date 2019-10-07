import React from "react";
import { Table } from "reactstrap";

const data = [
  {
    ticker: "AAPL",
    shares: 64,
    total: 2140
  },
  {
    ticker: "STWS",
    shares: 40,
    total: 2140
  },
  {
    ticker: "NFLX",
    shares: 64,
    total: 2140
  }
];

export const PortfolioStocks = () => {
  return (
    <Table striped>
      <tbody>
        {data.map((stock, index) => (
          <tr key={index}>
            <td>{stock.ticker}</td>
            <td>{stock.shares} Shares</td>
            <td>${stock.total.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
