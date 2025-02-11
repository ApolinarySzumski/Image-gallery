import { useEffect, useState } from "react";
import css from "./App.module.css";
import { Button } from "./components/Button/Button";
import { ImageGallery } from "./components/ImageGallery/ImageGallery";
import { ImageGalleryItem } from "./components/ImageGalleryItem/ImageGalleryItem";
import { Loader } from "./components/Loader/Loader";
import { Modal } from "./components/Modal/Modal";
import { Searchbar } from "./components/Searchbar/Searchbar";
import callToApi from "./functions/callToApi";
import { useToggle } from "./hooks/useToggle";

const App = () => {
  const [itemToSearch, setItemToSearch] = useState("");
  const [itemToSearchLocked, setItemToSearchLocked] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dataFromApi, setdataFromApi] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [imageFromModal, setImageFromModal] = useState("");
  const [error, setError] = useState(null);
  const { isOpen, open, close } = useToggle();

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
          setError(e);
        })
        .finally(() => {
          setIsLoading(false);
          setCurrentPage((prev) => prev + 1);
        });
  }, [currentPage, isLoading, itemToSearchLocked]);

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
    if (e.target.nodeName === "IMG") open();
    setImageFromModal(e.target.getAttribute("src"));
  };

  return (
    <>
      <div className={css.App}>
        <Searchbar handleSubmit={handleSubmit} handleChange={handleChange} />
        {error && <p>{error.message}</p>}
        {isOpen ? (
          <Modal imageFromModal={imageFromModal} closeModal={close} />
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
