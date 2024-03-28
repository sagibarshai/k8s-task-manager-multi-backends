import { TaskProps } from "../../../pages/tasks/types";

export interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  task: Omit<TaskProps, "timestamp" | "updated_at">;
  mode: "add" | "update";
}

export interface TaskFromState {
  isValid: boolean;
  isLoading: boolean;
  showError: boolean;
  error: string;
}
