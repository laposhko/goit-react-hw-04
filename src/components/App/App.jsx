import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import fetchImages from "../../images-api";

import css from "./App.module.css";
export default function App() {
  const [images, setImages] = useState("");
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [request, setRequest] = useState("");
  useEffect(() => {
    if (!request) {
      return;
    }
    const fetch = async () => {
      try {
        setError(false);
        setLoader(true);
        const response = await fetchImages(request, page);
        console.log(response.data.total_pages);
        setImages((prevData) => [...prevData, ...response.data.results]);
      } catch (err) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };

    fetch();
  }, [request, page]);
  async function handleSubmit(searchRequest) {
    setImages([]);
    setPage(1);
    setRequest(searchRequest);
  }
  async function loadMore() {
    setPage(page + 1);
    console.log(page);
  }
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} />}
      <Toaster />
      {loader && <Loader />}
      {page > 0 && <LoadMoreBtn onClick={loadMore} />}
    </div>
  );
}
