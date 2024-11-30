/**
 * TodoList Component
 * @package components
 */
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
/**
 * @param {*} props
 * @returns
 */
const TodoList = (props) => {
  const { todoList, searchInputValue, handleDeleteTodo } = props;
  return (
    <ul className={styles.list}>
      {todoList
        .filter((todo) => {
          const isMatch = todo.title.indexOf(searchInputValue) !== -1;
          return isMatch;
        })
        .map((todo) => {
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
  );
};

export default TodoList;
