import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table } from "reactstrap";

import { loadUserTransactions } from "../../actions/transactionActions";

export const Transactions = () => {
  const { transactions } = useSelector(state => state.transaction);
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = user.id || user._id;
    dispatch(loadUserTransactions(userId));
  }, []);

  if (!transactions) return <h1>You Haven't Made Any Transction</h1>;

  return (
    <div>
      <h1>Transactions</h1>
      <Table striped>
        <tbody>
          {transactions.result.map((transaction, index) => (
            <tr key={index}>
              <td>
                BUY ({transaction.ticker}) - {transaction.qty} shares @{" "}
                {transaction.price}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
