import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";
export default function ImageGallery({ items, openModal, changeImg }) {
  return (
    <ul className={css.gallery}>
      {items.map(({ id, urls, alt_description }) => (
        <li
          className={css.card}
          key={id}
          onClick={() => {
            openModal();
            changeImg({ url: urls.regular, description: alt_description });
          }}
        >
          <ImageCard url={urls.small} description={alt_description} />
        </li>
      ))}
    </ul>
  );
}
