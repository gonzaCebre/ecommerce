import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="product-card">
      <Link to={`/product/${product._id}`} className="product-card__link">
        <Card.Img src={product.image} variant="top" />

        <Card.Body>
          <Card.Title as="p">{product.name}</Card.Title>
          <Card.Text as="p">${product.price}</Card.Text>
        </Card.Body>
      </Link>
    </Card>
  );
};

export default Product;
