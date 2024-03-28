import styled from "styled-components";
import { StyledProps } from "./types";

export const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.colors.lights.backgrounds.black};
  opacity: 0.5;
  position: relative;
  backdrop-filter: blur(10px);
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledModal = styled.div<StyledProps>`
  position: fixed;
  width: ${(props) => props.width || "30%"};
  height: ${(props) => props.height || "60%"};
  background-color: ${({ theme }) => theme.palette.colors.lights.backgrounds.aqua};
  padding: ${({ theme }) => theme.spaces.l};
  border-radius: ${({ theme }) => theme.border.radiuses.l};
  z-index: 101;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledTitle = styled.div`
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
  font-size: ${({ theme }) => theme.fonts.sizes.xl};
  font-weight: ${({ theme }) => theme.fonts.weights.xxl};
  text-decoration: underline;
  margin-top: ${({ theme }) => theme.spaces.l};
`;

export const StyledCloseButton = styled.button`
  position: absolute;
  top: 5%;
  left: 5%;
  transform: translate(-50%, -50%);
  width: 30px;
  height: 30px;
  background-color: transparent;
  font-size: ${({ theme }) => theme.fonts.sizes.l};
  font-weight: ${({ theme }) => theme.fonts.weights.xxl};
  border: ${({ theme }) => theme.border.width.m} ${({ theme }) => theme.border.style.regular} ${({ theme }) => theme.border.colors.white};
  border-radius: 50%;
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
  cursor: pointer;
`;
