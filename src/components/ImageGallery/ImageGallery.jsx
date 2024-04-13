import ImageCard from "../ImageCard/ImageCard";
export default function ImageGallery({ items }) {
  console.log(items);
  return (
    <ul>
      {items.map(({ id, urls, alt_description }) => (
        <li key={id}>
          <ImageCard url={urls.small} description={alt_description} />
        </li>
      ))}
    </ul>
  );
}
