import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import blackImage from "../../assets/black.png";
import whiteImage from "../../assets/white.png";
interface Props {
  url: string;
  title: string;
  darkMode: boolean;
}

export const LazyLoadImageComponent = ({ url, title, darkMode }: Props) => {
  return (
    <LazyLoadImage
      className="aspect-square object-cover w-56"
      alt={title}
      src={url}
      effect="blur"
      placeholderSrc={darkMode ? blackImage : whiteImage}
    />
  );
};
