import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import ImageModal from "../ImageModal/ImageModal";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import { Toaster, toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import fetchImages from "../../images-api";

import css from "./App.module.css";
export default function App() {
  const [images, setImages] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [request, setRequest] = useState("");
  const [modalImg, setModalImg] = useState({});
  const [showBtn, setShowBtn] = useState(false);
  useEffect(() => {
    if (!request) {
      return;
    }
    const fetch = async () => {
      try {
        setError(false);
        setLoader(true);
        const response = await fetchImages(request, page);
        const totalPages = response.data.total_pages;
        setShowBtn(totalPages && totalPages !== page);
        setImages((prevData) => [...prevData, ...response.data.results]);
      } catch (err) {
        setError(true);
        setShowBtn(false);
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
  }

  const [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div className={css.app}>
      <ImageModal
        onClose={closeModal}
        onOpen={openModal}
        state={modalIsOpen}
        img={modalImg}
      />
      <SearchBar onSubmit={handleSubmit} />
      {images.length > 0 && (
        <ImageGallery
          openModal={openModal}
          items={images}
          changeImg={setModalImg}
        />
      )}
      <Toaster />
      {loader && <Loader />}
      {error && <ErrorMessage />}
      {showBtn && <LoadMoreBtn onClick={loadMore} />}
    </div>
  );
}
