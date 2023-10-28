import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const Paginate = ({
  pages,
  page,
  isAdmin = false,
  keyword = "",
  category = "",
}) => {
  return (
    pages > 1 && (
      <Pagination className="pagination">
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={
              !isAdmin
                ? keyword
                  ? `/search/${keyword}/category/${category}/page/${x + 1}` // Agrega la categoría al enlace de paginación
                  : `/products/page/${x + 1}` // Agrega la categoría al enlace de paginación
                : /* : `/category/${category}/page/${x + 1}`  */

                  `/admin/productlist/${x + 1}`
            }
          >
            <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  );
};

export default Paginate;
