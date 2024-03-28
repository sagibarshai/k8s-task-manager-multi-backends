import styled from "styled-components";

export const StyledTasksWrapper = styled.div`
  padding: 100px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: auto;
  gap: 40px;
  overflow-y: auto;
`;

export const StyledAddTaskWrapper = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  gap: ${({ theme }) => theme.spaces.m};
  align-items: baseline;
`;

export const StyledAddTask = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.colors.lights.backgrounds.purple};
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-weight: ${({ theme }) => theme.fonts.weights.xxl};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
`;

export const StyledAddTaskText = styled.p`
  color: ${({ theme }) => theme.palette.colors.lights.texts.purple};
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-weight: ${({ theme }) => theme.fonts.weights.xxl};
  text-decoration: underline;
`;

export const StyledWrapper = styled.div`
  display: grid;
  grid-template-rows: 9fr 1fr;
  height: 100%;
`;

export const StyledNoTasksPlaceHolder = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-weight: ${({ theme }) => theme.fonts.weights.xl};
`;
