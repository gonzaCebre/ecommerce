import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../slices/cartSlice";

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="cart-screen">
      <div className="cart-screen__cart">
        <h1>Carrito de compras</h1>

        {cartItems.length === 0 ? (
          <Message>
            Tu carrito está vacío <Link to="/">Volver</Link>
          </Message>
        ) : (
          <div className="cart-screen__cart__items">
            {cartItems.map((item) => (
              <div className="cart-screen__cart__items__item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-screen__cart__items__item__resume">
                  <Link to={`/product/${item._id}`}>{item.name}</Link>

                  <h3>${item.price * item.qty}</h3>

                  <div className="cart-screen__cart__items__item__resume__controls">
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                    <i
                      className="fa fa-trash"
                      onClick={() => removeFromCartHandler(item._id)}
                    ></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="cart-screen__resume">
        <h2>
          Subtotal: ${" "}
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}{" "}
        </h2>
        <div className="cart-screen__resume__buttons">
          <Link to="/products" className="button--violet">
            Seguir comprando
          </Link>
          <Button
            type="button"
            className="btn-block button--green"
            disabled={cartItems.length === 0}
            onClick={checkoutHandler}
          >
            Ir a pagar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
