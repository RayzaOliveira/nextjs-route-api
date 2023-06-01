import { v4 as uuid } from "uuid";

export type Todo = {
  id: string;
  name: string;
  done?: boolean;
};

let TODO_LIST: Todo[] = [
  {
    id: "0fca5ce2-f411-4e4d-b5f5-033c258d045d",
    name: "Todo 1",
    done: false,
  },
  {
    id: "e04b6c6e-a681-4e4e-b9a1-773c37e13e9d",
    name: "Todo 2",
    done: false,
  },
  {
    id: "0f21f1ed-5e8a-4d71-8766-e187516ae6f0",
    name: "Todo 3",
    done: false,
  },
  {
    id: "0521e37a-7583-4fac-ad33-ea026c93aeb4",
    name: "Todo 4",
    done: false,
  },
  {
    id: "9fcc77e9-9325-4289-8c2c-3b3d0dff0e2e",
    name: "Todo 5",
    done: false,
  },
  {
    id: "f0f5638c-a70f-4d19-82a7-60c2d377c449",
    name: "Todo 6",
    done: false,
  },
  {
    id: "f4777c5e-9a9a-4152-98f9-8cc0e01dd401",
    name: "Todo 7",
    done: false,
  },
];

const getById = (id: string) => {
  return TODO_LIST.find((item) => item.id === id);
};

export const list = () => {
  return TODO_LIST;
};

export const byId = (id: string) => {
  return getById(id);
};

export const add = (name: string) => {
  const data = {
    name,
    done: false,
    id: uuid(),
  };

  TODO_LIST.push(data);

  return data;
};

export const edit = (id: string, data: Omit<Todo, "id">) => {
  const todoFound = getById(id);

  if (!todoFound) {
    return null;
  }

  const updatedItem = {
    ...todoFound,
    ...data,
  };

  TODO_LIST = TODO_LIST.map((item) => {
    if (item.id === id) {
      return updatedItem;
    }

    return item;
  });

  return updatedItem;
};

export const remove = (id: string) => {
  const todoFound = getById(id);

  if (!todoFound) {
    return null;
  }

  TODO_LIST = TODO_LIST.filter((item) => item.id !== id);

  return todoFound;
};
