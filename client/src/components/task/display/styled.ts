import styled from "styled-components";

export const StyledTask = styled.div<{ index: number }>`
  padding: ${({ theme }) => theme.spaces.l} 0;
  display: grid;
  height: 300px;
  max-width: 400px;
  gap: ${({ theme }) => theme.spaces.l};
  justify-items: center;
  grid-template-rows: 1fr 1fr 3fr 1fr;
  border-radius: ${({ theme }) => theme.border.radiuses.l};
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: ${({ index, theme }) => {
    const colors = theme.palette.colors.lights.backgrounds;
    if (index % 2 === 0) {
      return colors.purple;
    } else if (index % 1 === 0) {
      return colors.aqua;
    } else {
      return colors.black;
    }
  }};
`;

export const StyledTaskTitle = styled.span`
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
  font-size: ${({ theme }) => theme.fonts.sizes.l};
  font-weight: ${({ theme }) => theme.fonts.weights.l};
  height: fit-content;
  text-decoration: underline;
`;

export const StyledTaskContent = styled.span`
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  border: ${({ theme }) => theme.border.width.l} ${({ theme }) => theme.border.style.regular} ${({ theme }) => theme.border.colors.white};
  width: 80%;
  border-radius: ${({ theme }) => theme.border.radiuses.l};
  padding: ${({ theme }) => theme.spaces.s};
  word-wrap: break-word;
  overflow-wrap: break-word;
  word-break: break-all;
`;

export const StyledRow = styled.div`
  height: fit-content;
  display: flex;
  gap: ${({ theme }) => theme.spaces.s};
`;

export const StyledIconWrapper = styled.div`
  display: flex;
  border-radius: 50%;
  width: fit-content;
  height: fit-content;
  padding: ${({ theme }) => theme.spaces.s};
  border: ${({ theme }) => theme.border.width.l} ${({ theme }) => theme.border.style.regular} ${({ theme }) => theme.border.colors.gray};
  cursor: pointer;
`;

export const StyledTimestamp = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  font-weight: ${({ theme }) => theme.fonts.weights.xxl};
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
  text-decoration: underline;
  height: fit-content;
`;
export const StyledCreatedAtText = styled.span`
  font-size: ${({ theme }) => theme.fonts.sizes.s};
  font-weight: ${({ theme }) => theme.fonts.weights.s};
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
  height: fit-content;
`;
