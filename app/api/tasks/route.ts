import prisma from "@/utils/connect-db";
import { auth } from "@clerk/nextjs/server";

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const tasks = await prisma.task.findMany({
      where: { userId },
    });
    return NextResponse.json({ tasks, status: 200 });
  } catch (error) {
    console.error("Error fetching tasks: ", error);
    return NextResponse.json({ error: "Error fetching tasks", status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { title, description, date, completed, important } =
      await request.json();

    if (!title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }
    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });
    return NextResponse.json({ task, status: 201 });
  } catch (error) {
    console.error("Error creating task: ", error);
    return NextResponse.json({ error: "Error creating task", status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized", status: 401 });
    }

    const { id, title, description, date, isCompleted, isImportant } =
      await request.json();

    if (!id || !title || !description || !date) {
      return NextResponse.json({
        error: "Missing required fields",
        status: 400,
      });
    }
    if (title.length < 3) {
      return NextResponse.json({
        error: "Title must be at least 3 characters long",
        status: 400,
      });
    }

    const task = await prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        date,
        isCompleted,
        isImportant,
      },
    });
    return NextResponse.json({ task, status: 200 });
  } catch (error) {
    console.error("Error updating task: ", error);
    return NextResponse.json({ error: "Error updating task", status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
  } catch (error) {
    console.error("Error deleting task: ", error);
    return NextResponse.json({ error: "Error deleting task", status: 500 });
  }
}
