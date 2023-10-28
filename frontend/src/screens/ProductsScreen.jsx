import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  useGetProductsQuery,
  useGetProductsByCategoryQuery,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Product from "../components/Product";
import Paginate from "../components/Paginate";
import SearchBox from "../components/SearchBox";
import CategoriesButtons from "../components/CategoriesButtons";

const ProductsScreen = () => {
  const { pageNumber, keyword, category } = useParams();

  const { data, isLoading, isError } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  const {
    data: productsByCategory,
    isLoading: loadingProductsByCategory,
    isError: errorProductsByCategory,
  } = useGetProductsByCategoryQuery({
    category,
    pageNumber,
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (productsByCategory) {
      const filteredProducts = productsByCategory.products.filter((product) => {
        // Filtra los productos por la palabra clave de búsqueda
        if (!keyword) {
          return true; // Si no hay palabra clave, muestra todos los productos
        }
        return product.name.toLowerCase().includes(keyword.toLowerCase()); // Cambia 'name' por la propiedad que deseas buscar
      });

      setProducts(filteredProducts);
    }
  }, [keyword, productsByCategory]);

  return (
    <>
      {!category ? (
        isLoading ? (
          <Loader />
        ) : isError ? (
          <Message variant="danger">
            {isError?.data?.message || isError.error}
          </Message>
        ) : (
          <>
            <SearchBox />
            <CategoriesButtons />
            <h1>TODOS LOS PRODUCTOS</h1>
            <div className="products-container">
              {data.products.map((product) => (
                <Product product={product} key={product._id} />
              ))}
            </div>
            <Paginate
              pages={data.pages}
              page={data.page}
              keyword={keyword ? keyword : ""}
            />
          </>
        )
      ) : loadingProductsByCategory ? (
        <Loader />
      ) : errorProductsByCategory ? (
        <Message variant="danger">
          {errorProductsByCategory?.data?.message ||
            errorProductsByCategory.error}
        </Message>
      ) : (
        <>
          <SearchBox />
          <CategoriesButtons />

          <h1>{category.toLocaleUpperCase()}</h1>

          <div className="products-container">
            {products.length > 0 ? (
              products.map((product) => (
                <Product product={product} key={product._id} />
              ))
            ) : (
              <p>
                No tenemos este tipo de productos. <br></br>
                Pero paciencia que los estamos craneando...
              </p>
            )}
          </div>
          <Paginate
            pages={productsByCategory.pages}
            page={productsByCategory.page}
            category={category ? category : ""}
          />
        </>
      )}
    </>
  );
};

export default ProductsScreen;
