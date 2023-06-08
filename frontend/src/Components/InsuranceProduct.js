import React from "react";

import Card from "react-bootstrap/Card";

export default function IncuranceProduct(props) {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Body>
        <Card.Title>{props.Title}</Card.Title>
        <Card.Text>{props.Description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
