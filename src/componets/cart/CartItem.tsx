import { Product } from "../../types/product.type";

interface Props {
  product: Product;
  decrementQuantity: (product: Product) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
}

export const CartItem = ({
  product,
  decrementQuantity,
  addToCart,
  removeFromCart,
}: Props) => {
  return (
    <li className="cart-item">
      <img
        className="cart-item__image"
        src={product.images[0]}
        alt={product.title}
      />

      <div>
        <span className="cart-item__name" title={product.title}>
          {product.title}
        </span>
        <span className="cart-item__unit">{product.price.toFixed(2)} $ each</span>
        <div className="cart-item__controls" aria-label={`Quantity for ${product.title}`}>
          <button
            type="button"
            className="quantity-button"
            aria-label={`Decrease ${product.title} quantity`}
            disabled={product.quantity <= 1}
            onClick={() => decrementQuantity(product)}
          >
            −
          </button>
          <span className="quantity-value" aria-live="polite">
            {product.quantity}
          </span>
          <button
            type="button"
            className="quantity-button"
            aria-label={`Increase ${product.title} quantity`}
            onClick={() => addToCart(product)}
          >
            +
          </button>
        </div>
        <button
          type="button"
          className="cart-item__remove"
          onClick={() => removeFromCart(product)}
        >
          Remove item
        </button>
      </div>

      <span className="cart-item__total">
        {(product.price * product.quantity).toFixed(2)} $
      </span>
    </li>
  );
};
