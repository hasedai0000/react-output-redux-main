/**
 * AddTodo Component
 *
 * @package components
 */
import InputForm from "../../atoms";
import styles from "./styles.module.css";

/**
 * @param {*} props
 * @returns
 */
const AddTodo = (props) => {
  const {
    addInputValue,
    handleChangeAddInputValue,
    handleAddTodo,
    setComposition,
  } = props;
  return (
    <>
      <h2 className={styles.subTitle}>{"Add Todo"}</h2>
      <InputForm
        placeholderText={"New Todo"}
        inputValue={addInputValue}
        handleChangeValue={handleChangeAddInputValue}
        handleKeyDown={handleAddTodo}
        setComposition={setComposition}
      />
    </>
  );
};

export default AddTodo;
