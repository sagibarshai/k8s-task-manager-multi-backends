import { StyledError, StyledLabel, StyledTextArea, StyledWrapper } from "./styled";
import { Props } from "./types";

const TextArea = ({ error, label, onChange, showError, value, rows }: Props) => {
  return (
    <StyledWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledTextArea rows={rows} onChange={onChange} value={value} />
      <StyledError>{showError ? error : ""}</StyledError>
    </StyledWrapper>
  );
};
export default TextArea;
