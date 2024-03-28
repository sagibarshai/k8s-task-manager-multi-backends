import { StyledCloseButton, StyledModal, StyledTitle, StyledWrapper } from "./styled";
import { Props } from "./types";

const AppModal = ({ title, isOpen, onClose, height, width, children }: Props) => {
  return (
    <>
      {isOpen ? (
        <StyledWrapper onClick={onClose}>
          <StyledModal onClick={(e) => e.stopPropagation()} width={width} height={height}>
            <StyledCloseButton onClick={onClose}>X</StyledCloseButton>
            <StyledTitle>{title}</StyledTitle>
            {children}
          </StyledModal>
        </StyledWrapper>
      ) : (
        <></>
      )}
    </>
  );
};

export default AppModal;
