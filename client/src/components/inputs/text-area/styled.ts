import styled from "styled-components";

export const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  height: fit-content;
  gap: ${({ theme }) => theme.spaces.xs};
  width: 100%;
  align-items: center;
`;

export const StyledTextArea = styled.textarea`
  width: 100%;
  text-indent: 8px;
  font-size: 16px;
  border: ${({ theme }) => theme.border.width.m} ${({ theme }) => theme.border.style.regular} ${({ theme }) => theme.border.colors.white};
  background-color: transparent;
  border-radius: ${({ theme }) => theme.border.radiuses.m};
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
  resize: none;
`;
export const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.fonts.sizes.l};
  font-weight: ${({ theme }) => theme.fonts.weights.l};
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
  align-self: flex-start;
`;
export const StyledError = styled.label`
  width: 100%;
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  font-weight: ${({ theme }) => theme.fonts.weights.l};
  color: ${({ theme }) => theme.palette.colors.lights.errors.red};
  text-align: flex-start;
`;
