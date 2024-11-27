/**
 * TodoTemplate
 *
 * @package components
 */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles.module.css";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../../../constants/data";
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

  /* actions */
  /**
   * addInputValueの変更処理
   * @param {*} e
   */
  const onChangeAddInputValue = (e) => {
    setAddInputValue(e.target.value);
  };

  /**
   * searchInputValueの変更処理
   * @param {*} e
   */
  const onChangeSearchInputValue = (e) => {
    setSearchInputValue(e.target.value);
  };

  /**
   * Todo登録処理
   * @param {*} e
   */
  const handleAddTodo = (e) => {
    if (e.key === "Enter" && addInputValue !== "") {
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
      {/* Todo追加エリア */}
      <section className={styles.common}>
        <h2 className={styles.subTitle}>{"Add Todo"}</h2>
        <input
          className={styles.input}
          type="text"
          placeholder={"New Todo"}
          value={addInputValue}
          onChange={onChangeAddInputValue}
          onKeyDown={handleAddTodo}
        />
      </section>
      {/* Todo検索フォームエリア */}
      <section className={styles.common}>
        <input
          className={styles.input}
          type="text"
          placeholder={"New Todo"}
          value={searchInputValue}
          onChange={onChangeSearchInputValue}
        />
      </section>
      {/* Todoリスト一覧表示 */}
      <section className={styles.common}>
        <ul className={styles.list}>
          {todoList.map((todo) => {
            return (
              <li className={styles.todo} key={todo.id}>
                <span className={styles.task}>{todo.title}</span>
                <div className={styles.far}>
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    size="lg"
                    onClick={() => handleDeleteTodo(todo.id, todo.title)}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};
