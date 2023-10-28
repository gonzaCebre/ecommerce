import { Link } from "react-router-dom";

const CategoriesButtons = () => {
  return (
    <div className="categories-buttons">
      <Link to="/category/pikas">Pikas</Link>
      <Link to="/category/fuegos">Fuegos</Link>
      <Link to="/category/portatucas">Portaporros</Link>
      <Link to="/category/cogolleros">Cogolleros</Link>
      <Link to="/category/llaveros">Llaveros</Link>
      <Link to="/category/sedas">Sedas</Link>
      <Link to="/category/filtros">Filtros</Link>
      <Link to="/category/otros">Otros</Link>
      <Link to="/category/Electronics">Electronics</Link>
    </div>
  );
};

export default CategoriesButtons;
