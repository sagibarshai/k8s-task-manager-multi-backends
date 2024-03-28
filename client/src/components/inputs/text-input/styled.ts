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

export const StyledInput = styled.input`
  width: 100%;
  height: 30px;
  text-indent: 8px;
  font-size: 16px;
  border: 1px solid white;
  background-color: transparent;
  border-radius: 8px;
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
`;
export const StyledLabel = styled.label`
  font-size: 20px;
  font-weight: ${({ theme }) => theme.fonts.weights.l};
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
  align-self: flex-start;
`;
export const StyledError = styled.label`
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.palette.colors.lights.errors.red};
  text-align: flex-start;
`;
