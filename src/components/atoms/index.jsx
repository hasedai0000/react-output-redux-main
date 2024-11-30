/**
 * InputForm Component
 *
 * @package components
 */
import { useState } from "react";
import styles from "./styles.module.css";

/**
 * InputForm Component
 * @param {*} props
 * @returns
 */
const InputForm = (props) => {
  const {
    placeholderText,
    inputValue,
    handleChangeValue,
    handleKeyDown,
    setComposition,
  } = props;

  const startComposition = () => setComposition(true);
  const endComposition = () => setComposition(false);

  return (
    <input
      className={styles.input}
      type="text"
      placeholder={placeholderText}
      value={inputValue}
      onChange={handleChangeValue}
      onKeyDown={handleKeyDown}
      onCompositionStart={startComposition}
      onCompositionEnd={endComposition}
    />
  );
};

export default InputForm;
