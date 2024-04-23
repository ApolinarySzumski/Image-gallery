import { useEffect, useState } from "react";
import css from "./App.module.css";
import { callToApi } from "./Functions/callToApi";
import { Button } from "./components/Button/Button";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "./components/Loader/Loader";
import { Modal } from "./components/Modal/Modal";
import { Searchbar } from "./components/Searchbar/Searchbar";

const App = () => {
  const [itemToSearch, setItemToSearch] = useState("");
  const [itemToSearchLocked, setItemToSearchLocked] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFromApi, setdataFromApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageFromModal, setImageFromModal] = useState("");

  useEffect(() => {
    if (isLoading)
      callToApi(itemToSearchLocked, currentPage)
        .then((resp) => {
          setdataFromApi((prev) => [
            ...prev,
            ...resp.hits.map((r) => ({
              myId: r.id,
              myLargeImageURL: r.largeImageURL,
              mySmallImageURL: r.webformatURL,
            })),
          ]);
        })
        .catch((e) => {
          console.log(e);
        })
        .finally(() => {
          setIsLoading(false);
          setCurrentPage((prev) => prev + 1);
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  useEffect(() => {
    setCurrentPage(1);
    setdataFromApi([]);
    setIsDataLoaded(false);
  }, [isDataLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { value } = e.target[1];
    setCurrentPage(1);
    if ([...itemToSearch].every((char) => char === " ") === false) {
      setItemToSearchLocked(value);
      setIsDataLoaded(true);
      setIsLoading(true);
    } else {
      alert("You must fill the input with your image to find");
      return false;
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setItemToSearch(value);
  };

  const handleClick = () => {
    setIsLoading(true);
    setIsDataLoaded(false);
  };

  const openModal = (e) => {
    if (e.target.nodeName === "IMG") setIsModalOpen(true);
    setImageFromModal(e.target.getAttribute("src"));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={css.App}>
        <Searchbar handleSubmit={handleSubmit} handleChange={handleChange} />
        {isModalOpen ? (
          <Modal imageFromModal={imageFromModal} closeModal={closeModal} />
        ) : (
          <></>
        )}
        <ImageGallery openModal={openModal}>
          <ImageGalleryItem dataFromApi={dataFromApi} />
        </ImageGallery>
        {isLoading ? <Loader /> : <></>}
        {currentPage > 1 ? <Button handleClick={handleClick} /> : <></>}
      </div>
    </>
  );
};

export default App;
