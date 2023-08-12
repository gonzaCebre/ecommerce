import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  /* const [paymentMethod, setPaymentMethod] = useState("PayPal"); */
  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    console.log(paymentMethod);
    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Método de pago</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Seleccionar método</Form.Label>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="Paypal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              onClick={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
          <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="Mercadopago"
              id="Mercadopago"
              name="paymentMethod"
              value="Mercadopago"
              onClick={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
          {/* <Col>
            <Form.Check
              type="radio"
              className="my-2"
              label="Transferencia"
              id="Transferencia"
              name="paymentMethod"
              value="Transferencia"
              onClick={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col> */}
        </Form.Group>
        <Button type="submit" variant="primary">
          Continuar
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
