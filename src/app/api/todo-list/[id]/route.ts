import * as TODO_LIST from "@/app/data/todo-list";
import { NextResponse } from "next/server";
import { v4 as uuid } from "uuid";

export async function GET(req: Request) {
  const id = req.url.split("=")[1];

  return NextResponse.json({ todoList: TODO_LIST.byId(id) });
}

type Params = {
  params: { id: string };
};

export async function PUT(request: Request, { params }: Params) {
  const { id } = params;
  const { name, done } = await request.json();

  const todoUpdated = TODO_LIST.edit(id, { name, done });

  if (!todoUpdated) {
    return NextResponse.json(
      {
        message: "Not Found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({ todoUpdated });
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = params;

  const deletedItem = TODO_LIST.remove(id);

  if (!deletedItem) {
    return NextResponse.json(
      {
        message: "Not Found",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    deletedItem,
  });
}
