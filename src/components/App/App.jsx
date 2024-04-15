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
  const [page, setPage] = useState(1);
  const [request, setRequest] = useState("");
  useEffect(() => {
    const fetchImages = async () => {
      try {
        // setImages([]);
        setError(false);
        setLoader(true);
        setPage(page + 1);
        const response = await fetchImages(request, page);
        setImages((prevData) => [...prevData, ...response.data.results]);
      } catch (err) {
        setError(true);
      } finally {
        setLoader(false);
      }
    };
    fetchImages();
  }, [request, page]);
  // async function renderImages(request) {
  //   try {
  //     // setImages([]);
  //     setError(false);
  //     setLoader(true);
  //     setPage(page + 1);
  //     const response = await fetchImages(request, page);

  //     setImages((prevData) => [...prevData, ...response.data.results]);
  //     console.log("render", request);
  //   } catch (err) {
  //     setError(true);
  //   } finally {
  //     setLoader(false);
  //   }
  // }
  async function handleSubmit(searchRequest) {
    setRequest(searchRequest);
    //   try {
    //     setImages([]);
    //     setError(false);
    //     setLoader(true);
    //     setPage(page + 1);
    //     const response = await fetchImages(searchRequest, page);
    //     console.log("setRequest", request);

    //     setImages(response.data.results);
    //   } catch (err) {
    //     setError(true);
    //   } finally {
    //     setLoader(false);
    //   }
  }
  // console.log(request);
  // async function loadMore() {
  //   try {
  //     console.log("loadmore", request);
  //     setLoader(true);
  //     setPage(page + 1);
  //     const response = await fetchImages(request, page);
  //     setImages((prevData) => [...prevData, ...response.data.results]);
  //   } catch (err) {
  //     setError(true);
  //   } finally {
  //     setLoader(false);
  //   }
  // }
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSubmit} />
      {error && <ErrorMessage />}
      {images.length > 0 && <ImageGallery items={images} />}
      <Toaster />
      {loader && <Loader />}
      {page > 1 && <LoadMoreBtn onClick={fetchImages} />}
    </div>
  );
}
