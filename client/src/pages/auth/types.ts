export type Field = "email" | "password";
export interface AuthFromState {
  isValid: boolean;
  isLoading: boolean;
  showError: boolean;
  error: string;
}
