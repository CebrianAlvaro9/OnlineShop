import { ByCategory } from "../componets/home/filters/ByCategory";
import { ByMinPrice } from "../componets/home/filters/ByMinPrice";
import { ByName } from "../componets/home/filters/ByName";
import { ProductList } from "../componets/home/ProductList";
import { PaginationProvider } from "../context/pagination";

export const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero-panel" aria-labelledby="store-hero-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span>01</span>
            / Curated goods
          </p>
          <h1 id="store-hero-title">
            Everyday pieces.
            <em>Better chosen.</em>
          </h1>
          <p className="hero-copy__intro">
            A considered collection of things worth keeping close. Discover practical,
            beautiful products for the way you live now.
          </p>
          <a className="hero-link" href="#catalog">
            Explore the collection <span aria-hidden="true">↓</span>
          </a>
        </div>

        <aside className="hero-stat" aria-label="Collection overview">
          <div className="hero-stat__top">
            <span>Nov / 24</span>
            <span>Live catalog</span>
          </div>
          <strong className="hero-stat__number">200+</strong>
          <span className="hero-stat__label">pieces to explore</span>
        </aside>
      </section>

      <section className="catalog-section" id="catalog" aria-labelledby="catalog-title">
        <div className="catalog-heading">
          <div>
            <p className="eyebrow">
              <span>02</span>
              / The essentials
            </p>
            <h2 id="catalog-title">Find your next favorite.</h2>
          </div>
          <p className="catalog-heading__description">
            Browse the latest selection, then narrow it down by name, category or price.
          </p>
        </div>

        <div className="catalog-toolbar" aria-label="Catalog filters">
          <div className="catalog-toolbar__intro">
            <strong>Filter by</strong>
            <span>Make it yours</span>
          </div>
          <div className="filters-row">
            <ByCategory />
            <ByName />
            <ByMinPrice />
          </div>
        </div>

        <PaginationProvider>
          <ProductList />
        </PaginationProvider>
      </section>
    </div>
  );
};
