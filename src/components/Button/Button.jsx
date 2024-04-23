import PropTypes from "prop-types";
import css from "./Button.module.css";

export const Button = ({ handleClick }) => (
  <button className={css.Button} onClick={handleClick}>
    Load more
  </button>
);

Button.propTypes = {
  handleClick: PropTypes.func,
};
