/**
 * TodoPage
 *
 * @package pages
 */
import { TodoProvider } from "../contexts/TodoContext.jsx";
import { TodoTemplate } from "../components/templates/TodoTemplate";

/**
 * TodoPage
 * @returns {JSX.Element}
 * @constructor
 */
export const TodoPage = () => (
  <TodoProvider>
    <TodoTemplate />
  </TodoProvider>
);
