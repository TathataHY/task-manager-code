"use client";

import { TaskProps } from "..";
import themes from "./themes";

import { useUser } from "@clerk/nextjs";
import axios from "axios";
import React from "react";
import toast from "react-hot-toast";

export const GlobalContext = React.createContext({
  theme: {} as any,
  modal: false,
  openModal: () => {},
  closeModal: () => {},
  collapsed: true,
  collapseMenu: () => {},
  tasks: [] as TaskProps[],
  allTasks: () => {},
  completedTasks: [] as TaskProps[],
  importantTasks: [] as TaskProps[],
  incompletedTasks: [] as TaskProps[],
  isLoading: false,
  updateTask: (task: TaskProps) => {},
  deleteTask: (id: string) => {},
});
export const GlobalUpdateContext = React.createContext({});

export default function GlobalProvider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [isLoading, setIsLoading] = React.useState(false);

  const [selectedTheme, setSelectedTheme] = React.useState(0);
  const theme = themes[selectedTheme];

  const [modal, setModal] = React.useState(false);
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const [collapsed, setCollapsed] = React.useState(true);
  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };

  const [tasks, setTasks] = React.useState<TaskProps[]>([]);
  const completedTasks = tasks.filter((task) => task.isCompleted);
  const importantTasks = tasks.filter((task) => task.isImportant);
  const incompletedTasks = tasks.filter((task) => !task.isCompleted);
  const allTasks = async () => {
    setIsLoading(true);
    try {
      const { data: response } = await axios.get("/api/tasks");
      if (response.error) {
        console.error(response.error);
        return;
      }
      const sorted = response.tasks.sort((a: any, b: any) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      });
      setTasks(sorted);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { user } = useUser();
  React.useEffect(() => {
    if (user) allTasks();
  }, [user]);

  const updateTask = async (task: TaskProps) => {
    try {
      const { data: response } = await axios.put(`/api/tasks`, task);
      if (response.error) {
        toast.error(response.error);
        console.error(response.error);
        return;
      }
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
      toast.success("Task updated successfully");
    } catch (error) {
      toast.error("Error updating task");
      console.error(error);
    }
  };
  const deleteTask = async (id: string) => {
    try {
      const { data: response } = await axios.delete(`/api/tasks/${id}`);
      if (response.error) {
        toast.error(response.error);
        console.error(response.error);
        return;
      }
      setTasks(tasks.filter((task) => task.id !== id));

      toast.success("Task deleted successfully");
    } catch (error) {
      toast.error("Error deleting task");
      console.error(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        theme,
        modal,
        openModal,
        closeModal,
        collapsed,
        collapseMenu,
        tasks,
        allTasks,
        completedTasks,
        importantTasks,
        incompletedTasks,
        isLoading,
        updateTask,
        deleteTask,
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
}

export const useGlobalState = () => React.useContext(GlobalContext);
export const useGlobalUpdate = () => React.useContext(GlobalUpdateContext);
