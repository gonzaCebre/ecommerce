export const addDecimals = (num) => {
  //Agrega dos decimales a los numeros
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  //Calculando los precios de los items
  state.itemsPrice = addDecimals(
    state.cartItems.reduce(
      (acc, item) => acc + item.price * item.qty, //Multiplica el precio por la cant de items
      0 //El acumulador arranca en 0
    )
  );

  //Calculando el costo de envio (si la compra es mayor a $100, el envio es gratis, sino sale $10)
  state.shippingAddress.shippingPrice = Number(state.shippingAddress.shippingPrice);
  /*state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10); */

  //Calculando los impuestos de la compra (15%)
  state.discountPrice = Number(0);
/* state.discountPrice = addDecimals(Number(((10 * state.itemsPrice)/100).toFixed(2))); */

  //Calculando el precio total
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingAddress.shippingPrice) -
    Number(state.discountPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state)); //Lo setea en el localStorage

  return state;
};
