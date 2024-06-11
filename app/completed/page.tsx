"use client";

import Tasks from "@/components/tasks/tasks";
import { useGlobalState } from "@/context/global-provider";

export default function Completed() {
  const { completedTasks } = useGlobalState();

  return (
    <>
      <Tasks title="Completed Tasks" tasks={completedTasks} />
    </>
  );
}
