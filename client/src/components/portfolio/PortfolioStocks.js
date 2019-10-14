import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "reactstrap";

import { loadUserPortfolio } from "../../actions/transactionActions";

export const PortfolioStocks = () => {
  const { portfolio } = useSelector(state => state.transaction);
  const { user, isAuthenticated, isLoading } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = user.id || user._id;
    dispatch(loadUserPortfolio(userId));
  }, []);

  if (!portfolio) return <h1>You Haven't Bought Any Stocks.</h1>;

  return (
    <div>
      <h1>Portfolio (${portfolio.portfolioValue})</h1>
      <Table striped>
        <tbody>
          {portfolio.results.map((stock, index) => (
            <tr key={index}>
              <td style={{ color: stock.colorStyle }}>{stock.ticker}</td>
              <td>{stock.qty} Shares</td>
              <td>${stock.totalValue}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
