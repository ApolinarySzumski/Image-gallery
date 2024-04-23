import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";

export const ImageGallery = ({ children, openModal }) => {
  return (
    <ul className={css.ImageGallery} onClick={openModal}>
      {children}
    </ul>
  );
};

ImageGallery.propTypes = {
  children: PropTypes.node,
  openModal: PropTypes.func,
};
