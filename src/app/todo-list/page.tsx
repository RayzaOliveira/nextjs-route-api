"use client";
import React from "react";
import { type Todo } from "../data/todo-list";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Page() {
  const [todoList, setTodoList] = React.useState<Todo[]>([]);
  const { register, handleSubmit, setValue, watch, reset } = useForm<Todo>();

  const todoId = watch("id");

  const loadData = async () => {
    const { data } = await axios.get("/api/todo-list");

    setTodoList(data.data);
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string) => {
    const willDelete = confirm("Are you sure that you want to delete it?");

    if (!willDelete) {
      return;
    }

    try {
      await axios.delete(`/api/todo-list/${id}`);

      loadData();
    } catch (error) {
      console.log("error::", error);
    }
  };

  const handleEditForm = (data: Todo) => {
    setValue("id", data.id);
    setValue("name", data.name);
    setValue("done", data.done);
  };

  const handleSubmitForm = async (data: Todo) => {
    try {
      if (data.id) {
        await axios.put(`/api/todo-list/${data.id}`, {
          done: data.done,
          name: data.name,
        });
      } else {
        await axios.post(`/api/todo-list`, {
          done: data.done,
          name: data.name,
        });
      }

      reset();

      loadData();
    } catch (error) {
      console.log("error::", error);
    }
  };

  return (
    <div className="p-4">
      <h1>Todo List</h1>

      <ul className="pl-4 py-5 flex flex-col gap-3">
        {todoList.map((todo) => {
          return (
            <li className="flex gap-3 items-center" key={todo.id}>
              {todo.name} - {todo.done ? "Done" : "Ready to start"}
              <button onClick={() => handleDelete(todo.id)} type="button">
                delete
              </button>
              <button onClick={() => handleEditForm(todo)} type="button">
                edit
              </button>
            </li>
          );
        })}
      </ul>

      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          placeholder="Create here your todo item"
          {...register("name")}
        />

        {!!todoId && (
          <label htmlFor="done">
            <input type="checkbox" id="done" {...register("done")} />
            Done
          </label>
        )}

        <div className="flex gap-4">
          <button onClick={() => reset()} type="button">
            Reset
          </button>

          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
