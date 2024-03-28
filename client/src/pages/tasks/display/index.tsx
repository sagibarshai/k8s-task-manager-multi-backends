import { useEffect, useState } from "react";
import appAxios from "../../../axios";
import Task from "../../../components/task/display";
import { TaskProps } from "../types";
import { StyledAddTask, StyledAddTaskText, StyledAddTaskWrapper, StyledNoTasksPlaceHolder, StyledTasksWrapper, StyledWrapper } from "./styled";
import TaskForm from "../../../components/task/task-form";
import { TaskModalFormState } from "./types";
import { IconEmptyTasks } from "../../../icons";

const DisplayTasks = () => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);
  const [shouldUpdateTasks, setShouldUpdateTasks] = useState<boolean>(true);
  const [formState, setFormState] = useState<TaskModalFormState>({
    isOpen: false,
    mode: "add",
    task: {
      content: "",
      title: "",
      id: "",
    },
  });

  const onToggleForm = () => setFormState({ ...formState, isOpen: !formState.isOpen });

  const onSuccessChangeTasks = () => setShouldUpdateTasks(true);

  const onUpdateTask = (task: TaskProps) => setFormState({ ...formState, task: task, isOpen: true, mode: "update" });

  const onAddTask = () => setFormState({ ...formState, task: formState.task, isOpen: true, mode: "add" });

  const onDeleteTask = async (id: string) => {
    try {
      await appAxios.delete(`/api/${id}`);
      setShouldUpdateTasks(true);
    } catch (err) {
      console.log(err);
    }
  };

  const onFetchTasks = async () => {
    try {
      const response = await appAxios.get("/api");
      const responseTasks = response.data.notes as TaskProps[];
      setTasks(responseTasks);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (shouldUpdateTasks) {
      onFetchTasks();
      setShouldUpdateTasks(false);
    }
  }, [shouldUpdateTasks]);

  return (
    <StyledWrapper>
      <TaskForm onSuccess={onSuccessChangeTasks} mode={formState.mode} task={formState.task} isOpen={formState.isOpen} onClose={onToggleForm} />
      <StyledTasksWrapper>
        {!tasks.length && !formState.isOpen ? (
          <StyledNoTasksPlaceHolder>
            No Tasks, add one now!
            <IconEmptyTasks />
          </StyledNoTasksPlaceHolder>
        ) : (
          tasks.map((task, index) => (
            <Task key={task.id} onDelete={() => onDeleteTask(task.id)} onUpdate={() => onUpdateTask(task)} index={index} task={task} />
          ))
        )}
      </StyledTasksWrapper>
      <StyledAddTaskWrapper onClick={onAddTask}>
        <StyledAddTask>+</StyledAddTask>
        <StyledAddTaskText>Add Task !</StyledAddTaskText>
      </StyledAddTaskWrapper>
    </StyledWrapper>
  );
};
export default DisplayTasks;
