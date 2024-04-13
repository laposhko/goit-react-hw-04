export default function ImageCard({ url, description }) {
  return (
    <div>
      <img src={url} alt={description} />
    </div>
  );
}
