import css from './ImageGallery.module.css';

export const ImageGallery = ({ children, openModal }) => {
  return (
    <ul className={css.ImageGallery} onClick={openModal}>
      {children}
    </ul>
  );
};
