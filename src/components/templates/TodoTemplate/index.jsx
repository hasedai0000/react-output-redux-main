/**
 * TodoTemplate
 *
 * @package components
 */
import styles from "./styles.module.css";
import AddTodo from "../../organisms/AddTodo";
import TodoList from "../../organisms/TodoList";
import InputForm from "../../atoms";
import { useTodoContext } from "../../../contexts/TodoContext.jsx";
/**
 * TodoTemplate
 * @returns {JSX.Element}
 * @constructor
 */
export const TodoTemplate = () => {
  const {
    addInputValue,
    searchInputValue,
    showTodoList,
    setComposition,
    handleChangeAddInputValue,
    handleChangeSearchInputValue,
    handleAddTodo,
    handleDeleteTodo,
  } = useTodoContext();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{"Todo List"}</h1>
      {/* Add Todo */}
      <section className={styles.common}>
        <AddTodo
          addInputValue={addInputValue}
          handleChangeAddInputValue={handleChangeAddInputValue}
          handleAddTodo={handleAddTodo}
          setComposition={setComposition}
        />
      </section>
      {/* Add Todo End*/}
      {/* Search Todo */}
      <section className={styles.common}>
        <InputForm
          placeholderText={"Search Keyword"}
          inputValue={searchInputValue}
          handleChangeValue={handleChangeSearchInputValue}
          setComposition={setComposition}
        />
      </section>
      {/* Search Todo End*/}
      {/* Todo List */}
      <section className={styles.common}>
        {showTodoList.length > 0 ? (
          <TodoList
            todoList={showTodoList}
            searchInputValue={searchInputValue}
            handleDeleteTodo={handleDeleteTodo}
          />
        ) : (
          <></>
        )}
      </section>
      {/* Todo List End*/}
    </div>
  );
};
