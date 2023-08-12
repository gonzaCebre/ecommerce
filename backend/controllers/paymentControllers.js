import asyncHandler from "express-async-handler";
import mercadopago from "mercadopago";

//@description    Create new preference
//@route    POST /api/payment
//@access    Private

const createMercadopagoPreference = asyncHandler(async(req, res) => {

	const orderId = req.body.orderId;

    mercadopago.configure({
        access_token: process.env.MERCADOPAGO_ACCESS_TOKEN, //Este es el "access Token" que te da mercadopago en las credenciales de prueba
    })

	const preference = { //crea una preferencia
		items: [
			{
				title: req.body.description, //viene desde el body
				unit_price: Number(req.body.price), //viene desde el body y lo transforma en "Number" por las dudas
				quantity: Number(req.body.quantity), //viene desde el body y lo transforma en "Number" por las dudas
			}
		],
		back_urls: {
			"success": `${process.env.HOST}/order/${orderId}`, //Vuelve a la pagina de donde vino. Le podes poner la web que quieras
			"failure": `${process.env.HOST}/order/${orderId}`, //Vuelve a la pagina de donde vino
			"pending": `${process.env.HOST}/order/${orderId}`, 
		},/* 
		notification_url: 'https://41e0-2803-9800-9887-4b53-ed71-19bf-cb95-b32d.ngrok.io/api/payment/webhook', */
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.status(200).json({
				id: response.body.id //genera un id de la preferencia para poder devolverlo al front con la data de lo que se va a comprar
			});
		}).catch(function (error) {
			res.status(404)
            throw new Error(error)
		});
});


const receiveWebhook = asyncHandler(async (req, res) => {

    const payment = req.query;

	console.log(payment)

    try {
        if(payment.type === 'payment'){
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data)

            res.sendStatus(204)
            //Store in database 
			console.log('orden pagada')
        }
    
    } catch (error) {
        console.log(error)
        return res.sendStatus(500).json({error: error.message})
    }
    
});

export {
    createMercadopagoPreference,
    receiveWebhook
}