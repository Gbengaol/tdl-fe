/// <reference types="react-scripts" />

declare module "react-pagination-js";

interface LoginFormData {
  email: string;
  password: PasswordType;
}

interface RegistrationFormData {
  email: string;
  password: string;
  passwordAgain: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  gender: string;
}

interface ForgotPasswordData {
  email: string;
}

interface ManagePasswordData {
  oldPassword?: string;
  newPassword: string;
  newPasswordAgain: string;
}

interface ChildrenType {
  children: JSX.Element | null;
}

interface ErrorProps {
  errors: {
    type: string | undefined | FieldError;
  };
}

interface TodoProps {
  todo_item: string;
  description: string;
  priority: string;
  status: any;
  created_at: {
    substring: any;
  };
  id: number;
}
