export default function ImageCard({ url, description, onClick }) {
  return (
    <div onClick={onClick}>
      <img src={url} alt={description} />
    </div>
  );
}
