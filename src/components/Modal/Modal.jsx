import PropTypes from "prop-types";
import css from "./Modal.module.css";

export const Modal = ({ imageFromModal, closeModal }) => {
  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>
        <img src={imageFromModal} alt="" />
      </div>
    </div>
  );
};

Modal.propTypes = {
  imageFromModal: PropTypes.string,
  closeModal: PropTypes.func,
};
