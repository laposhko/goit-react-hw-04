import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
export default function ImageGallery({ items }) {
  return (
    <ul className={css.gallery}>
      {items.map(({ id, urls, alt_description }) => (
        <li key={id}>
          <ImageCard url={urls.small} description={alt_description} />
        </li>
      ))}
    </ul>
  );
}
