//Este archivo va a llamar a las otras slices

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL2 } from "../constants";

const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL2 });

export const apiSlice = createApi({
  baseQuery, //Recibe la url base del sitio
  tagTypes: ["Product", "Order", "User"], //son los diferentes tipos de data que va a importar
  endpoints: (builder) => ({}),
});
