import { PropsWithChildren } from "react";

export type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
} & StyledProps &
  PropsWithChildren;

export interface StyledProps {
  width?: string;
  height?: string;
}
