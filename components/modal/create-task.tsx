"use client";

import { useGlobalState } from "@/context/global-provider";
import { add } from "@/utils/icons";
import Button from "../button/button";

import axios from "axios";
import React from "react";
import toast from "react-hot-toast";
import styled from "styled-components";

function CreateTask() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState("");
  const [completed, setCompleted] = React.useState(false);
  const [important, setImportant] = React.useState(false);

  const { theme, allTasks, closeModal } = useGlobalState();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const task = {
      title,
      description,
      date,
      completed,
      important,
    };

    try {
      const { data: response } = await axios.post("/api/tasks", task);

      if (response.error) {
        toast.error(response.error);
        return;
      }

      if (response.status === 201) {
        setTitle("");
        setDescription("");
        setDate("");
        setCompleted(false);
        setImportant(false);

        allTasks();
        closeModal();
        toast.success("Task created successfully");
      }
    } catch (error) {
      toast.error("Error creating task");
      console.error("Error creating task: ", error);
    }
  };

  return (
    <CreateTaskStyled onSubmit={handleSubmit} theme={theme}>
      <h1>Create a Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g, Watch a video from Fireship."
          required
        />
      </div>

      <div className="input-control">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="e.g, Watch a video about Next.js Auth."
          required
        ></textarea>
      </div>

      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="input-control toggler">
        <label htmlFor="completed">Completed</label>
        <input
          type="checkbox"
          name="completed"
          id="completed"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
      </div>

      <div className="input-control toggler">
        <label htmlFor="important">Important</label>
        <input
          type="checkbox"
          name="important"
          id="important"
          checked={important}
          onChange={(e) => setImportant(e.target.checked)}
        />
      </div>

      <div className="submit-control flex justify-end">
        <Button
          type="submit"
          name="Create Task"
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
      </div>
    </CreateTaskStyled>
  );
}

export default CreateTask;

const CreateTaskStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${({ theme }) => theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${({ theme }) => theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${({ theme }) => theme.colorGreyDark};
      color: ${({ theme }) => theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-control button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${({ theme }) => theme.colorGrey0};
    }

    &:hover {
      background: ${({ theme }) => theme.colorPrimaryGreen} !important;
      color: ${({ theme }) => theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;
