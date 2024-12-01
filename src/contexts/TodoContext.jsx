/**
 * TodoContext
 *
 * @package contexts
 */
import { useContext, createContext } from "react";
import { useTodo } from "../hooks/useTodo.js";

/**
 * TodoContext
 */
const TodoContext = createContext({});

/**
 * TodoProvider
 * @param children
 * @constructor
 */
export const TodoProvider = ({ children }) => {
  // カスタムフックから状態とロジックを呼び出してコンテキストプロバイダー　にあてがう
  const {
    addInputValue,
    searchInputValue,
    showTodoList,
    setComposition,
    handleChangeAddInputValue,
    handleChangeSearchInputValue,
    handleAddTodo,
    handleDeleteTodo,
  } = useTodo();

  return (
    <TodoContext.Provider
      value={{
        addInputValue,
        searchInputValue,
        showTodoList,
        setComposition,
        handleChangeAddInputValue,
        handleChangeSearchInputValue,
        handleAddTodo,
        handleDeleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

/**
 * useTodoContext
 */
export const useTodoContext = () => useContext(TodoContext);
