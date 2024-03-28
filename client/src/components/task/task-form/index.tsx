import { ChangeEvent, useEffect, useState } from "react";
import { TaskRequest } from "../../../pages/tasks/types";
import TextInput from "../../inputs/text-input";
import { InputState } from "../../inputs/types";
import AppModal from "../../modal";
import TextArea from "../../inputs/text-area";
import { StyledInputWrapper, StyledSubmitButton } from "./styled";
import { Props, TaskFromState } from "./types";
import appAxios from "../../../axios";
import AppLoader from "../../loader";

const TaskForm = ({ isOpen, onClose, task, mode, onSuccess }: Props) => {
  const [noteTitle, setNoteTitle] = useState<InputState<TaskRequest["title"]>>({ error: "", isValid: false, showError: false, value: task.title });
  const [noteContent, setNoteContent] = useState<InputState<TaskRequest["content"]>>({
    error: "",
    isValid: false,
    showError: false,
    value: task.content,
  });
  const [formState, setFormState] = useState<TaskFromState>({ error: "", isLoading: false, isValid: false, showError: false });

  const onInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, filed: keyof TaskRequest) => {
    const value = event.target.value;
    if (filed === "title") {
      const isValid = value.length >= 2;
      setNoteTitle({ value, error: "Title are not valid", isValid, showError: !isValid });
    } else {
      const isValid = value.length >= 2;
      setNoteContent({ value, error: "Title are not valid", isValid, showError: !isValid });
    }
  };

  const onSubmit = async () => {
    setFormState({ ...formState, isLoading: true });
    try {
      if (mode === "add") {
        await appAxios.post("/api", {
          title: noteTitle.value,
          content: noteContent.value,
        });
        onSuccess();
      } else {
        await appAxios.put(`/api/${task.id}`, {
          title: noteTitle.value,
          content: noteContent.value,
        });
        onSuccess();
      }
    } catch (err) {
      console.log(err);
    } finally {
      setFormState({ ...formState, isLoading: false });
      onClose();
    }
  };

  useEffect(() => {
    // check from validity based on his dependencies
    let isFormValid = true;
    if (!noteTitle.isValid || !noteContent.isValid) isFormValid = false;
    setFormState({ ...formState, isValid: isFormValid });
  }, [noteContent.isValid, noteTitle.isValid]);

  useEffect(() => {
    // updated inputs when mode === "update"
    if (mode === "update") {
      setNoteTitle({ ...noteContent, value: task.title, isValid: true });
      setNoteContent({ ...noteContent, value: task.content, isValid: true });
    }
  }, [task]);

  useEffect(() => {
    // cleanup inputs
    if (!isOpen) {
      setNoteContent({ error: "", isValid: false, showError: false, value: "" });
      setNoteTitle({ error: "", isValid: false, showError: false, value: "" });
    }
  }, [isOpen]);

  return (
    <AppModal isOpen={isOpen} onClose={onClose} title="Add Note">
      <StyledInputWrapper>
        <TextInput
          label="Title"
          error={noteTitle.error}
          onChange={(e) => onInputChange(e, "title")}
          showError={noteTitle.showError}
          type="text"
          value={noteTitle.value}
        />
        <TextArea
          rows={10}
          label="Content"
          error={noteContent.error}
          onChange={(e) => onInputChange(e, "content")}
          showError={noteContent.showError}
          value={noteContent.value}
        />
        <StyledSubmitButton disabled={!formState.isValid} onClick={onSubmit}>
          {formState.isLoading ? <AppLoader /> : "Save"}
        </StyledSubmitButton>
      </StyledInputWrapper>
    </AppModal>
  );
};
export default TaskForm;
