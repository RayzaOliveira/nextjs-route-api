import * as TODO_LIST from "@/app/data/todo-list";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const list = TODO_LIST.list();

  console.log("list:::", list);

  return NextResponse.json({
    count: list.length,
    data: list,
  });
}

export async function POST(request: Request) {
  const { name } = await request.json();

  const created = TODO_LIST.add(name);

  return NextResponse.json({ created });
}
