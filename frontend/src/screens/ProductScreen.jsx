import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import Meta from "../components/Meta";

const ProductScreen = () => {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty })); //ejecuta 'addToCart' que viene desde el Slice de Cart
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review exitosa");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  //Set postal code
  const [provincia, setProvincia] = useState("Provincia...");
  const [shippingPrice, setShippingPrice] = useState(0);

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
    } else if (provincia === "Provincia...") {
      setShippingPrice(0);
    } else {
      setShippingPrice(1445);
    }
  }, [provincia]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <>
          <Meta title={product.name} description={product.description} />
          <Link className="button--violet volver" to="/">
            Volver
          </Link>
          <div className="product-container">
            <div className="product__img">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product__description">
              <h3>{product.name}</h3>
              <p className="product__description__price">${product.price}</p>
              {product.countInStock > 0 && (
                <div className="product__description__addToCart">
                  <Form.Select
                    value={qty}
                    onChange={(e) => setQty(Number(e.target.value))}
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Select>
                  <Button
                    className="btn-block button--violet"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Agregar al carrito
                  </Button>
                </div>
              )}
              <p className="product-price">
                {" "}
                {product.price} x {qty} = ${(product.price * qty).toFixed(0)}
              </p>
            </div>

            <div className="product__resume">
              <p className="product__resume__description">
                {product.description}
              </p>
              <div className="product__resume__shipping">
                <p className="product__resume__shipping__title">
                  Calcular envío
                </p>

                <div className="product__resume__shipping--shipping">
                  <img src={require("../media/envio.png")} alt="" />
                  <Form.Select
                    value={provincia}
                    onChange={(e) => setProvincia(e.target.value)}
                  >
                    <option>Provincia...</option>
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
                </div>
              </div>
              <p> Costo del envío: ${shippingPrice}</p>
            </div>
          </div>

          {/*           <div className="review">
            <h2>Reviews</h2>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
              color={"#00B156"}
            />
            {product.reviews.length === 0 && (
              <Message>Aún no hay reviews</Message>
            )}
            <div>
              {product.reviews.map((review) => (
                <div key={review._id}>
                  <strong>{review.name}</strong>
                  <Rating value={review.rating} />
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p>{review.comment}</p>
                </div>
              ))}

              <h2>Escribí una review</h2>
              {loadingProductReview && <Loader />}

              {userInfo ? (
                <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating" className="my-2">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control
                      as="select"
                      value={rating}
                      onChange={(e) => setRating(Number(e.target.value))}
                    >
                      <option value="">Select...</option>
                      <option value="1">1 - Malo</option>
                      <option value="2">2 - Zafa</option>
                      <option value="3">3 - Piola</option>
                      <option value="4">4 - Muy piola</option>
                      <option value="5">5 - Excelente</option>
                    </Form.Control>
                    <Form.Group controlId="comment" className="my-2">
                      <Form.Label>Comentario</Form.Label>
                      <Form.Control
                        as="textarea"
                        row="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></Form.Control>
                    </Form.Group>
                    <Button
                      disabled={loadingProductReview}
                      type="submit"
                      variant="primary"
                      className="button--violet"
                    >
                      Enviar
                    </Button>
                  </Form.Group>
                </Form>
              ) : (
                <Message>
                  <Link to="/login">Logueate</Link> para dejar una review{" "}
                </Message>
              )}
            </div>
          </div> */}
        </>
      )}
    </>
  );
};

export default ProductScreen;
