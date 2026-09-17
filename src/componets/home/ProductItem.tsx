import { Product } from "../../types/product.type";
import { AddCartButton } from "./AddCartButton";
import { LazyLoadImageComponent } from "./LazyLoadImageComponent";

interface Props {
  product: Product;
  darkMode: boolean;
}

const formatPrice = (price: number) => `${price.toFixed(2)} $`;

export const ProductItem = ({ product, darkMode }: Props) => {
  const discount = Math.round(product.discountPercentage);
  const availability = product.availabilityStatus ?? "In Stock";

  return (
    <li className="product-card" key={product.id}>
      <div className="product-card__media">
        <span className="product-card__badge">{product.category}</span>
        {discount > 0 && (
          <span className="product-card__discount">-{discount}%</span>
        )}
        <LazyLoadImageComponent
          darkMode={darkMode}
          url={product.images[0]}
          title={product.title}
        />
      </div>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{product.brand || "Nov Market"}</span>
          <span className="product-card__rating">★ {product.rating.toFixed(1)}</span>
        </div>

        <h3 title={product.title}>{product.title}</h3>
        <p className="product-card__description">{product.description}</p>

        <div className="product-card__footer">
          <div className="product-card__price">
            <span className="product-card__price-label">Current price</span>
            <strong>{formatPrice(product.price)}</strong>
            <span className="product-card__stock">{availability}</span>
          </div>
          <AddCartButton product={product} />
        </div>
      </div>
    </li>
  );
};
