import css from './Modal.module.css';

export const Modal = ({ openModal, imageFromModal, closeModal }) => {
  return (
    <div className={css.Overlay} onClick={closeModal}>
      <div className={css.Modal}>
        <img src={imageFromModal} alt="" />
      </div>
    </div>
  );
};
