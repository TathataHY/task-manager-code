"use client";

import Tasks from "@/components/tasks/tasks";
import { useGlobalState } from "@/context/global-provider";

export default function Important() {
  const { importantTasks } = useGlobalState();

  return (
    <>
      <Tasks title="Important Tasks" tasks={importantTasks} />
    </>
  );
}
