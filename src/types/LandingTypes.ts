export interface InputProps {
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}