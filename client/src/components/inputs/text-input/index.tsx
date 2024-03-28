import { StyledError, StyledInput, StyledLabel, StyledWrapper } from "./styled";
import { Props } from "./types";

const TextInput = ({ error, label, onChange, showError, value, type = "text" }: Props) => {
  return (
    <StyledWrapper>
      <StyledLabel>{label}</StyledLabel>
      <StyledInput type={type} onChange={onChange} value={value} />
      <StyledError>{showError ? error : ""}</StyledError>
    </StyledWrapper>
  );
};
export default TextInput;
