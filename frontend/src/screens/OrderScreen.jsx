import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Button,
  Card,
  ListGroupItem,
} from "react-bootstrap";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
  useDeliverOrderMutation,
  useGetMercadopagoPublicKeyQuery,
} from "../slices/ordersApiSlice";
import axios from "axios";
import { MERCADOPAGO_URL } from "../constants";

const OrderScreen = () => {
  //Obteniendo el 'id' de la orden
  const { id: orderId } = useParams();

  //Obteniendo datos del usuario
  const { userInfo } = useSelector((state) => state.auth);

  //Seteando el email del usuario
  const [email, setEmail] = useState("");
  useEffect(() => {
    if (userInfo) {
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.email]);

  //Para obtener la data de la orden
  const {
    data: order,
    refetch,
    isLoading,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  //Para poder actualizar el pago de la orden
  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  //Para poder actualizar si la orden fue enviada o no
  const [deliverOrder, { isLoading: loadingDeliver }] =
    useDeliverOrderMutation();

  //PAYPAL
  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();

  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({
          type: "setLoadingStatus",
          value: "pending",
        });
      };

      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  //Todo esto viene de la documentacion de PayPal
  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch(); //Para que se cambie a "pagado"
        toast.success("Pago exitoso");
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    });
  }

  function onError(error) {
    toast.error(error.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  //MERCADOPAGO

  const {
    data: mercadopago,
    isLoading: loadingMercadopago,
    error: errorMercadopago,
  } = useGetMercadopagoPublicKeyQuery();

  const [preferenceId, setPreferenceId] = useState(null);

  useEffect(() => {
    if (!errorMercadopago && !loadingMercadopago && mercadopago.publicKey) {
      initMercadoPago(mercadopago.publicKey);

      //Se debe crear la preferencia para que se genere el boton de mp
      const createPreference = async () => {
        try {
          const response = await axios.post(
            `${MERCADOPAGO_URL}/create-order`, //Manda la preferencia a la ruta creada en el back
            {
              description: "Compra Stay Chill",
              price: order.totalPrice,
              quantity: 1,
              currency_id: "ARS",
              orderId, //Cambiar
            }
          );

          const { id } = response.data; //Recibe el id desde el server
          return id;
        } catch (error) {
          console.log(error);
        }
      };

      const createMpButton = async () => {
        const id = await createPreference(); //Recibe el id que retorna la otra funcion
        if (id) {
          setPreferenceId(id); //Setea el estado con el id recibido
        }
      };
      createMpButton(); //Crea el boton de mercadopago
    }
  }, [errorMercadopago, loadingMercadopago, mercadopago, order, orderId]);

  const [orderStatus, setOrderStatus] = useState("");
  const [paymentIdOrder, setPaymentIdOrder] = useState("");

  //Recibe los parametros que devuelve el pago de Mercadopago
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const status = params.get("status");
  const paymentId = params.get("payment_id");

  useEffect(() => {
    const orderIsPaid = async (details2) => {
      try {
        await payOrder({ orderId, details: details2 });
        toast.success("Pago exitoso");
        refetch(); //Para que se cambie a "pagado"
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    };

    if (status === "approved") {
      setOrderStatus(status);
    }
    if (paymentId) {
      setPaymentIdOrder(paymentId);
    }
    if (orderStatus === "approved") {
      const date = Date.now();
      const updateTime = new Date(date).toISOString();
      const orderString = {
        status: orderStatus.toString(),
        id: paymentIdOrder,
        update_time: updateTime,
        payer: {
          email_address: email,
        },
      };
      orderIsPaid(orderString);
    }
  }, [
    email,
    orderId,
    orderStatus,
    payOrder,
    paymentId,
    paymentIdOrder,
    refetch,
    status,
  ]);

  const deliverOrderHandler = async (e) => {
    e.preventDefault();
    try {
      await deliverOrder(orderId);
      refetch(); //Actualiza la pag y la base de datos
      toast.success("Orden enviada");
    } catch (error) {
      toast.error(error?.data?.message || error.message);
    }
  };

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <Message variant="danger" />
  ) : (
    <>
      <h1>Orden: {order._id}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2>Envío</h2>
              <p>
                <strong>Nombre: </strong> {order.user.name}
              </p>
              <p>
                <strong>Email: </strong> {order.user.email}
              </p>
              <p>
                <strong>Dirección: </strong> {order.shippingAddress.address},{" "}
                {order.shippingAddress.city} ,{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>
              {order.isDelivered ? (
                <Message variant="success">
                  Despachado el {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">No despachado</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Método de pago</h2>
              <p>
                <strong>Método: </strong>
                {order.paymentMethod}
              </p>
              {order.isPaid ? (
                <Message variant="success">
                  Pagado el{" "}
                  {new Intl.DateTimeFormat("es-ES").format(
                    new Date(order.paidAt)
                  )}
                </Message>
              ) : (
                <Message variant="danger">No pagado</Message>
              )}
            </ListGroupItem>
            <ListGroupItem>
              <h2>Tu compra: </h2>
              {order.orderItems.map((item, index) => (
                <ListGroupItem key={index}>
                  <Row>
                    <Col md={1}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={4}>
                      {item.qty} x ${item.price} = ${item.qty * item.price}
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroupItem>
                <h2>Resumen de compra</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Productos:</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
                <Row>
                  <Col>Envío</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
                <Row>
                  <Col>Recargo</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroupItem>

              {!order.isPaid && order.paymentMethod === "PayPal" && (
                <ListGroupItem>
                  {loadingPay && <Loader />}

                  {isPending ? (
                    <Loader />
                  ) : (
                    <div>
                      <div>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          onError={onError}
                        ></PayPalButtons>
                      </div>
                    </div>
                  )}
                </ListGroupItem>
              )}

              {!order.isPaid &&
                preferenceId &&
                order.paymentMethod === "Mercadopago" && (
                  <ListGroupItem>
                    {loadingMercadopago && <Loader />}

                    {isPending ? (
                      <Loader />
                    ) : (
                      <Wallet
                        initialization={{ preferenceId }}
                        customization={{
                          texts: {
                            action: "comprar",
                            valueProp: "detalles_seguridad",
                          },
                        }}
                      />
                    )}
                  </ListGroupItem>
                )}

              {!order.isPaid && order.paymentMethod === "Transferencia" && (
                <ListGroupItem>
                  <div>
                    <Button>Generar pago</Button>
                  </div>
                </ListGroupItem>
              )}

              {loadingDeliver && <Loader />}
              {userInfo &&
                userInfo.isAdmin &&
                order.isPaid &&
                !order.isDelivered && (
                  <ListGroupItem>
                    <Button
                      type="button"
                      className="btn btn-block"
                      onClick={deliverOrderHandler}
                    >
                      Marcar como enviado
                    </Button>
                  </ListGroupItem>
                )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default OrderScreen;
