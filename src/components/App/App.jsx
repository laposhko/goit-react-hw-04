import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

import css from "./App.module.css";
export default function App() {
  const [images, setImages] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  async function handleSubmit(searchRequest) {
    const accessKey = "HVVbUNNZTtHkh7SV5nJXigFdNXwVW7ejxukzYuAxSG0";

    try {
      setImages([]);
      setError(false);
      setLoader(true);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos/?client_id=${accessKey}&query=${searchRequest}`
      );
      setImages(response.data.results);
    } catch (err) {
      setError(true);
    } finally {
      setLoader(false);
    }
  }
  console.log(images);

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} />}
      <Toaster />
      {loader && <Loader />}
    </div>
  );
}
