export interface Props {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  showError: boolean;
  error: string;
  type?: React.HTMLInputTypeAttribute;
}
