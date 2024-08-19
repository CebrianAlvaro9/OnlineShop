import { ByCategory } from "../componets/filters/ByCategory";
import { useFilters } from "../hooks/useFilters";

//https://dummyjson.com/products?limit=10

export const HomePage = () => {
  const { filteredProducts } = useFilters();

  return (
    <div className="p-5  dark:text-white">
      <div>
        <h2 className="text-2xl">Products List: {filteredProducts.length} </h2>
      </div>
      <div>
        <ByCategory />
      </div>
      <section>
        <div className="pt-4 flex flex-wrap gap-5 justify-center">
          {filteredProducts ? (
            filteredProducts.slice(0, 20).map((product) => (
              <ul
                className="w-48 rounded-lg p-2 dark:bg-stone-700 bg-stone-100"
                key={product.id}
              >
                <li>
                  <img className="" src={product.thumbnail} alt="loading" />
                </li>
                <li>{product.title}</li>
                <li>{product.price} $</li>
              </ul>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </section>
    </div>
  );
};
