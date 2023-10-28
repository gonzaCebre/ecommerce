import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button, Col } from "react-bootstrap";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";
import alienBilletera from "../media/alien-billetera.svg";

const PaymentScreen = () => {
  /* const [paymentMethod, setPaymentMethod] = useState("PayPal"); */
  const [paymentMethod, setPaymentMethod] = useState("Mercadopago");

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
    navigate("/placeorder");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 />
      <h1>Método de pago</h1>
      <div className="payment-method">
        <img src={alienBilletera} alt="" className="alien-wallet" />
        <Form onSubmit={submitHandler} className="payment-method__form">
          <Form.Group>
            <Col>
              <Form.Check
                type="radio"
                label="Paypal"
                id="PayPal"
                name="paymentMethod"
                value="PayPal"
                onClick={(e) => setPaymentMethod(e.target.value)}
                disabled
              ></Form.Check>
            </Col>
            <Col>
              <Form.Check
                type="radio"
                label="Mercadopago"
                id="Mercadopago"
                name="paymentMethod"
                value="Mercadopago"
                onClick={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>
          <Button type="submit" variant="primary" className="button--violet">
            Continuar
          </Button>
        </Form>
      </div>
    </>
  );
};

export default PaymentScreen;
