import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StyledModal = styled.div`
  width: 40%;
  height: 60%;
  display: flex;
  flex-direction: column;
  gap: 40px;
  border-radius: ${({ theme }) => theme.border.radiuses.xl};
  align-items: center;
  padding: ${({ theme }) => theme.spaces.xl};
  background-color: ${({ theme }) => theme.palette.colors.lights.backgrounds.aqua};
  box-shadow: 0 0 250px 0px;
`;

export const StyledTitle = styled.h1`
  font-size: 24px;
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
  font-weight: ${({ theme }) => theme.fonts.weights.xl};
  text-decoration: underline;
`;

export const StyledInputsWrapper = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.xl};
`;

export const StylesLoginButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40%;
  border: 1px solid ${({ theme }) => theme.border.colors.white};
  background-color: transparent;
  border-radius: 8px;
  height: 45px;
  background-color: ${({ theme }) => theme.palette.colors.lights.backgrounds.appBackground};
  text-align: center;
  font-size: 16px;
  font-weight: bolder;
  cursor: pointer;
  &:disabled {
    opacity: 0.7;
  }
`;

export const StyledButtonWrapper = styled.div`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spaces.s};
`;

export const StyledError = styled.p`
  color: ${({ theme }) => theme.palette.colors.lights.errors.red};
  font-size: ${({ theme }) => theme.fonts.sizes.s};
`;

export const StyledLink = styled(Link)`
  font-size: ${({ theme }) => theme.fonts.sizes.m};
  text-decoration: underline;
  color: ${({ theme }) => theme.palette.colors.lights.texts.white};
`;
