import { TaskProps } from "../../../pages/tasks/types";

export interface Props {
  onUpdate: () => void;
  onDelete: () => void;
  task: TaskProps;
  index: number;
}
