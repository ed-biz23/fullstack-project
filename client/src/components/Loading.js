import React from "react";
import { Spinner } from "reactstrap";

export const Loading = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <Spinner color="primary" />
      <Spinner color="secondary" />
      <Spinner color="success" />
      <Spinner color="danger" />
      <Spinner color="warning" />
      <Spinner color="info" />
      <Spinner color="light" />
      <Spinner color="dark" />
    </div>
  );
};
