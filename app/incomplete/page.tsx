"use client";

import Tasks from "@/components/tasks/tasks";
import { useGlobalState } from "@/context/global-provider";

export default function Incomplete() {
  const { incompletedTasks } = useGlobalState();

  return (
    <>
      <Tasks title="Incompleted Tasks" tasks={incompletedTasks} />
    </>
  );
}
