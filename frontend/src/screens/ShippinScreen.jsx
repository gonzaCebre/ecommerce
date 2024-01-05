import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippinScreen = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress?.address || ""); //Si ya hay un "Shipping Address" lo rellena automaticamente
  const [provincia, setProvincia] = useState(shippingAddress?.provincia || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || ""
  );
  const [shippingPrice, setShippingPrice] = useState(
    shippingAddress?.shippingPrice || "0"
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        provincia,
        shippingPrice,
      })
    );
    navigate("/payment");
  };

  useEffect(() => {
    if (
      provincia === "Buenos Aires" ||
      provincia === "Catamarca" ||
      provincia === "Entre Ríos" ||
      provincia === "La Pampa" ||
      provincia === "La Rioja" ||
      provincia === "Mendoza" ||
      provincia === "San Juan" ||
      provincia === "San Luis" ||
      provincia === "Santa Fe" ||
      provincia === "Santiago del Estero" ||
      provincia === "Tucumán"
    ) {
      setShippingPrice(1731);
    } else if (
      provincia === "Chaco" ||
      provincia === "Corrientes" ||
      provincia === "Formosa" ||
      provincia === "Jujuy" ||
      provincia === "Neuquén" ||
      provincia === "Río Negro" ||
      provincia === "Salta"
    ) {
      setShippingPrice(1885);
    } else if (
      provincia === "Chubut" ||
      provincia === "Misiones" ||
      provincia === "Santa Cruz" ||
      provincia === "Tierra del Fuego"
    ) {
      setShippingPrice(1900);
    } else {
      setShippingPrice(1445);
    }
  }, [provincia]);

  useEffect(() => {
    if (
      city === "Córdoba" ||
      city === "Cordoba" ||
      city === "córdoba" ||
      city === "cordoba"
    ) {
      setShippingPrice(0);
    } else {
      if (
        provincia === "Buenos Aires" ||
        provincia === "Catamarca" ||
        provincia === "Entre Ríos" ||
        provincia === "La Pampa" ||
        provincia === "La Rioja" ||
        provincia === "Mendoza" ||
        provincia === "San Juan" ||
        provincia === "San Luis" ||
        provincia === "Santa Fe" ||
        provincia === "Santiago del Estero" ||
        provincia === "Tucumán"
      ) {
        setShippingPrice(1731);
      } else if (
        provincia === "Chaco" ||
        provincia === "Corrientes" ||
        provincia === "Formosa" ||
        provincia === "Jujuy" ||
        provincia === "Neuquén" ||
        provincia === "Río Negro" ||
        provincia === "Salta"
      ) {
        setShippingPrice(1885);
      } else if (
        provincia === "Chubut" ||
        provincia === "Misiones" ||
        provincia === "Santa Cruz" ||
        provincia === "Tierra del Fuego"
      ) {
        setShippingPrice(1900);
      } else {
        setShippingPrice(1445);
      }
    }
  }, [city, provincia]);

  return (
    <>
      <CheckoutSteps step1 step2 />

      <h1>Envío</h1>

      <Form onSubmit={submitHandler} className="shipping-form">
        <Form.Group controlId="address" className="shipping-form__item">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="provincia" className="shipping-form__item">
          <Form.Label>Provincia</Form.Label>
          <Form.Select
            value={provincia}
            onChange={(e) => setProvincia(e.target.value)}
          >
            <option>Buenos Aires</option>
            <option>Catamarca</option>
            <option>Chaco</option>
            <option>Chubut</option>
            <option>Córdoba</option>
            <option>Corrientes</option>
            <option>Entre Ríos</option>
            <option>Formosa</option>
            <option>Jujuy</option>
            <option>La Pampa</option>
            <option>La Rioja</option>
            <option>Mendoza</option>
            <option>Misiones</option>
            <option>Neuquén</option>
            <option>Río Negro</option>
            <option>Salta</option>
            <option>San Juan</option>
            <option>San Luis</option>
            <option>Santa Cruz</option>
            <option>Santa Fe</option>
            <option>Santiago del Estero</option>
            <option>Tierra del Fuego</option>
            <option>Tucumán</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="city" className="shipping-form__item">
          <Form.Label>Ciudad</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode" className="shipping-form__item">
          <Form.Label>Código postal</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Postal Code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className="shipping-cost">
          <h3>Costo de envío</h3>
          <p>${shippingPrice}</p>
          {shippingPrice === 0 && (
            <p className="shipping-cba">Envío a cargo de cadetería.</p>
          )}
        </div>
        <Button type="submit" variant="primary" className="button--violet">
          Continuar
        </Button>
      </Form>
    </>
  );
};

export default ShippinScreen;
