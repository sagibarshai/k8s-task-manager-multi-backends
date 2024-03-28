export interface Props {
  label: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  value: string;
  showError: boolean;
  error: string;
  rows: number;
}
