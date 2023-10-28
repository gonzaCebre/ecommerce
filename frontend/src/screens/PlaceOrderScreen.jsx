import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { toast } from "react-toastify";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/ordersApiSlice";
import { clearCartItems } from "../slices/cartSlice";

const PlaceOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      navigate("/shipping");
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingAddress.shippingPrice,
        discountPrice: cart.discountPrice,
        totalPrice: cart.totalPrice,
      }).unwrap();
      dispatch(clearCartItems());
      navigate(`/order/${res._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <div className="place-order-screen">
        <div className="place-order-screen__items">
          <div className="place-order-screen__items__item">
            <h2>Tu compra</h2>
            {cart.cartItems.legth === 0 ? (
              <Message>Tu carrito está vacío</Message>
            ) : (
              <div className="place-order-screen__items__item__items-cart">
                {cart.cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="place-order-screen__items__item__items-cart__item"
                  >
                    <div className="img-container">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="place-order-screen__items__item__items-cart__item__description">
                      <div className="place-order-screen__items__item__items-cart__item__description__link">
                        <Link to={`/products/${item.product}`}>
                          {item.name}
                        </Link>
                      </div>
                      <p>
                        {item.qty} x ${item.price} = ${item.qty * item.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="place-order-screen__items__item">
            <h2>Envío</h2>
            <p>
              <strong>Dirección: </strong>
              {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
              {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
            </p>
          </div>

          <div className="place-order-screen__items__item">
            <h2>Método de pago</h2>
            <p>
              <strong>Método: </strong>
              {cart.paymentMethod}
            </p>
          </div>
        </div>

        <div className="place-order-screen__resume">
          <h2>Resumen de compra</h2>

          <div className="place-order-screen__resume__item">
            <p>Productos: </p>
            <p>${cart.itemsPrice}</p>
          </div>

          <div className="place-order-screen__resume__item">
            <p>Envío: </p>
            <p>${cart.shippingAddress.shippingPrice}</p>
          </div>

          <div className="place-order-screen__resume__item">
            <p>Descuento: </p>
            <p>- ${cart.discountPrice}</p>
          </div>

          <div className="place-order-screen__resume__item">
            <p>Total: </p>
            <p>${cart.totalPrice}</p>
          </div>

          <div className="place-order-screen__resume__item">
            {error && <Message variant="danger">{error}</Message>}
          </div>

          <Button
            type="button"
            className="btn-block button--violet"
            disabled={cart.cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Ir a pagar
          </Button>
        </div>

        {isLoading && <Loader />}
      </div>
    </>
  );
};

export default PlaceOrderScreen;
