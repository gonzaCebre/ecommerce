import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  //Hay que detectar si existe un redireccionamiento
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = searchParams.get("redirect") || "/"; //detecta si la url tiene un 'redirect', sino deja el '/'

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res })); //dispara setCredential con la info que proviene del form y setCredential aloja la data en el localstorage

      /*       // Acceder al token JWT de las cookies
      const jwtCookie = document.cookie
        .split("; ")
        .find((row) => row.startsWith("jwt="));
      const jwtToken = jwtCookie ? jwtCookie.split("=")[1] : null;

      console.log("Token JWT:", jwtToken); // Muestra el token JWT en la consola */

      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="login">
      <h1>Entrar</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Ingresa tu mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId="password" className="my-3">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button
          type="submit"
          variant="primary"
          className="button--violet"
          disabled={isLoading}
        >
          Entrar
        </Button>

        {isLoading && <Loader />}
      </Form>
      <div className="login--change">
        <p>Comprás por primera vez?</p>
        <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
          Registrate
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;
