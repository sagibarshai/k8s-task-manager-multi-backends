import styled from "styled-components";

export const StyledInputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.l};
`;

export const StyledSubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.colors.lights.backgrounds.appBackground};
  width: 100%;
  height: 30px;
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  font-weight: ${({ theme }) => theme.fonts.weights.m};
  border: none;
  border-radius: ${({ theme }) => theme.border.radiuses.m};
  padding: ${({ theme }) => theme.spaces.s};
  margin: 0 auto;
  cursor: pointer;
  &:disabled {
    opacity: 0.5;
  }
`;
