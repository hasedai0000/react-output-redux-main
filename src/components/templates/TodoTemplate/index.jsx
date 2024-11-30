/**
 * TodoTemplate
 *
 * @package components
 */
import { useState } from "react";
import styles from "./styles.module.css";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data";
import AddTodo from "../../organisms/AddTodo";
import TodoList from "../../organisms/TodoList";
import InputForm from "../../atoms";
/**
 * TodoTemplate
 * @returns {JSX.Element}
 * @constructor
 */
export const TodoTemplate = () => {
  /** todo list */
  const [todoList, setTodoList] = useState(INIT_TODO_LIST);
  /** new todo */
  const [addInputValue, setAddInputValue] = useState("");
  /** todo　採番ID */
  const [uniqueId, setUniqueId] = useState(INIT_UNIQUE_ID);
  /** search word */
  const [searchInputValue, setSearchInputValue] = useState("");

  const [composing, setComposition] = useState(false);

  /* actions */
  /**
   * addInputValueの変更処理
   * @param {*} e
   */
  const handleChangeAddInputValue = (e) => {
    setAddInputValue(e.target.value);
  };

  /**
   * searchInputValueの変更処理
   * @param {*} e
   */
  const handleChangeSearchInputValue = (e) => {
    setSearchInputValue(e.target.value);
  };

  /**
   * Todo登録処理
   * @param {*} e
   */
  const handleAddTodo = (e) => {
    if (e.key === "Enter" && addInputValue !== "" && !composing) {
      const newUniqueId = uniqueId + 1;
      const newTodoList = [
        ...todoList,
        {
          id: newUniqueId,
          title: addInputValue,
        },
      ];
      // 新しいTodoが追加された値でStateを更新
      setTodoList(newTodoList);
      // 新しい採番でStateを更新
      setUniqueId(newUniqueId);
      // 追加後、入力内容をリセット
      setAddInputValue("");
    }
  };

  /**
   * Todo削除処理
   * @param {*} e
   */
  const handleDeleteTodo = (targetId, targetTitle) => {
    if (window.confirm(`「${targetTitle}」のTodoを削除しますか？`)) {
      const newTodoList = todoList.filter((todo) => todo.id !== targetId);
      setTodoList(newTodoList);
    }
  };

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
        <TodoList
          todoList={todoList}
          searchInputValue={searchInputValue}
          handleDeleteTodo={handleDeleteTodo}
        />
      </section>
      {/* Todo List End*/}
    </div>
  );
};
