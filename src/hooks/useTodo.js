import { useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo } from "../store/todo";

export const useTodo = () => {
  /** state */
  // @ts-ignore
  const todoList = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  /** new todo */
  const [addInputValue, setAddInputValue] = useState("");
  /** search word */
  const [searchInputValue, setSearchInputValue] = useState("");
  /** コンポジションモード */
  const [composing, setComposition] = useState(false);

  /* actions */
  /**
   * 検索結果のTodo一覧
   */
  const showTodoList = useMemo(() => {
    return todoList.filter((todo) => {
      // 検索キーワードに部分一致したTodoだけを一覧表示する
      const regexp = new RegExp("^" + searchInputValue, "i");
      return todo.title.match(regexp);
    });
    // useMemoの第二引数([originTodoList, searchInputValue])に依存して処理が実行される
    // searchInputValue
    // ただし結果が前回と同じならキャッシュを返却し処理は実行されない(無駄な処理を省いている)
    // 詳しくはuseMemoを調べてください。
  }, [todoList, searchInputValue]);

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
      // Todo追加処理
      dispatch(addTodo(addInputValue));
      // 追加後、入力内容をリセット
      setAddInputValue("");
    }
  };

  /**
   * Todo削除処理
   * @param {*} e
   */
  const handleDeleteTodo = (targetId, targetTitle) => {
    if (window.confirm(`「${targetTitle}」のTodoを削除しますか？`))
      dispatch(deleteTodo(targetId));
  };

  return {
    addInputValue,
    searchInputValue,
    showTodoList,
    setComposition,
    handleChangeAddInputValue,
    handleChangeSearchInputValue,
    handleAddTodo,
    handleDeleteTodo,
  };
};
