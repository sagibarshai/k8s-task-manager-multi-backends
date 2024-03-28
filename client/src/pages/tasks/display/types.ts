import { TaskProps } from "../types";

export interface TaskModalFormState {
  isOpen: boolean;
  mode: "add" | "update";
  task: Omit<TaskProps, "updated_at" | "timestamp">;
}
