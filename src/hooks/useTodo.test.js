import { beforeEach, describe, expect, test, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useTodo } from "./useTodo";
import { INIT_TODO_LIST } from "../constants/data";

describe("【Hooksテスト】useApp test", () => {
  describe("【関数テスト】handleChangeAddInputValue", () => {
    test("【正常系】addInputValueを更新できること", () => {
      const expectValue = "テスト";
      //引数
      const eventObject = {
        target: {
          value: expectValue,
        },
      };
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行
      act(() => result.current[1].handleChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe(expectValue);
    });
  });

  describe("【関数テスト】handleAddTodo", () => {
    // 予想値
    let expectTodoList = [];
    // 引数
    let eventObject = {
      target: {
        value: "テスト",
      },
      key: "Enter",
    };

    /**
     * beforeEach
     * test関数が実行される前に毎回実行される
     * 今回の場合はテスト対象に渡す引数を毎回初期化する
     */
    beforeEach(() => {
      // 引数の初期化
      eventObject = {
        target: {
          value: "テスト",
        },
        key: "Enter",
      };
    });

    test("【正常系】todoList, uniqueIdが更新されること、addInputValueがリセットされること", () => {
      // 予測値
      const expectTodoTitle = "Todo3";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      // 引数
      eventObject.target.value = expectTodoTitle;

      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行(addInputValueを更新)
      act(() => result.current[1].handleChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe(expectTodoTitle);

      // hooks関数の実行: handleAddTodoの実行
      act(() => result.current[1].handleAddTodo(eventObject));
      // 表示用TodoListの予想通り更新されたこと
      expect(result.current[0].showTodoList).toEqual(expectTodoList);
      // 入力値(addInputValue)がリセットされたこと
      expect(result.current[0].addInputValue).toBe("");
    });

    test("【正常系】エンターキーを押していない場合、処理が発生しないこと", () => {
      // 予測値
      const expectTodoTitle = "Todo4";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      // 引数
      eventObject.target.value = expectTodoTitle;
      eventObject.key = "";
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      // hooks関数の実行(addInputValueを更新)
      act(() => result.current[1].handleChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe(expectTodoTitle);

      // hooks関数の実行: handleAddTodoの実行
      act(() => result.current[1].handleAddTodo(eventObject));
      // 表示用TodoListの予想通り更新されないこと
      expect(result.current[0].showTodoList).not.toEqual(expectTodoList);
      // 入力値(addInputValue)がリセットされない
      expect(result.current[0].addInputValue).not.toBe("");
    });
    test("【正常系】入力値が空の場合、処理が発生しないこと", () => {
      // 予測値
      const expectTodoTitle = "Todo5";
      expectTodoList = INIT_TODO_LIST.concat({
        id: 3,
        title: expectTodoTitle,
      });
      // 引数
      eventObject.target.value = "";
      eventObject.key = "";
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行（addInputValueを更新）
      act(() => result.current[1].handleChangeAddInputValue(eventObject));
      expect(result.current[0].addInputValue).toBe("");
      // hooks関数の実行: handleAddTodoの実行
      act(() => result.current[1].handleAddTodo(eventObject));
      // 表示用TodoListの予想通り更新されないこと
      expect(result.current[0].showTodoList).not.toEqual(expectTodoList);
    });
  });

  describe("【関数テスト】handleDeleteTodo", () => {
    // 予測値
    let expectTodoList = [];

    beforeEach(() => {
      // 予測値を初期化
      expectTodoList = [];
    });

    test("【正常系】todoが削除されること", () => {
      // 引数
      const targetId = 1;
      const targetTitle = "テスト";
      // window.confirmをモック化
      // confirmでキャンセルをクリックした場合
      window.confirm = () => vi.fn().mockReturnValueOnce(true);
      // 予測値
      expectTodoList = INIT_TODO_LIST.filter((todo) => todo.id !== targetId);
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      act(() => result.current[1].handleDeleteTodo(targetId, targetTitle));
      // 表示用TodoListが予想通り更新されること
      expect(result.current[0].showTodoList).toEqual(expectTodoList);
    });

    test("【正常系】confirmでキャンセルをクリックした場合、todoが削除されないこと", () => {
      // 引数
      const targetId = 1;
      const targetTitle = "テスト";
      // window.confirmをモック化
      // confirmでキャンセルをクリックした場合
      window.confirm = vi.fn().mockReturnValueOnce(false);
      // 予測値
      expectTodoList = INIT_TODO_LIST;
      // hooks呼び出し
      const { result } = renderHook(() => useTodo());
      act(() => result.current[1].handleDeleteTodo(targetId, targetTitle));
      // 表示用TodoListが予想通り更新されないこと
      expect(result.current[0].showTodoList).toEqual(expectTodoList);
    });
  });
});
