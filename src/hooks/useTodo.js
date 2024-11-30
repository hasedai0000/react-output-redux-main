import { useState, useMemo } from "react";
import { INIT_TODO_LIST, INIT_UNIQUE_ID } from "../constants/data";

export const useTodo = () => {
  /** todo list */
  const [todoList, setTodoList] = useState(INIT_TODO_LIST);
  /** new todo */
  const [addInputValue, setAddInputValue] = useState("");
  /** todo　採番ID */
  const [uniqueId, setUniqueId] = useState(INIT_UNIQUE_ID);
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

  const state = {
    addInputValue,
    searchInputValue,
    showTodoList,
  };

  const actions = {
    setComposition,
    handleChangeAddInputValue,
    handleChangeSearchInputValue,
    handleAddTodo,
    handleDeleteTodo,
  };

  return [state, actions];
};
