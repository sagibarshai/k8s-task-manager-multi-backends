import { StyledTaskContent, StyledTask, StyledTaskTitle, StyledRow, StyledIconWrapper, StyledTimestamp, StyledCreatedAtText } from "./styled";
import { Props } from "./types";
import { IconDelete, IconEditPen } from "../../../icons";
import { format } from "date-fns";
import { theme } from "../../../theme";
const Task = ({ task, index, onUpdate, onDelete }: Props) => {
  return (
    <StyledTask index={index}>
      <StyledRow>
        <StyledCreatedAtText>Created at:</StyledCreatedAtText>
        <StyledTimestamp>{format(task.timestamp, "yy-MM-dd HH:mm")}</StyledTimestamp>
      </StyledRow>
      <StyledTaskTitle>{task.title}</StyledTaskTitle>
      <StyledTaskContent>{task.content}</StyledTaskContent>
      <StyledRow>
        <StyledIconWrapper onClick={onUpdate}>
          <IconEditPen size={theme.icons.sizes.m} color={theme.icons.colors.white} />
        </StyledIconWrapper>
        <StyledIconWrapper onClick={onDelete}>
          <IconDelete size={theme.icons.sizes.m} color={theme.icons.colors.white} />
        </StyledIconWrapper>
      </StyledRow>
    </StyledTask>
  );
};

export default Task;
