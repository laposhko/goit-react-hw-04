export default function ImageCard({ url, description, onClick }) {
  return (
    <div>
      <img onClick={onClick} src={url} alt={description} />
    </div>
  );
}
