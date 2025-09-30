import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  isLoading = false,
  disabled,
  children,
  className = '',
  ...rest
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={[
        'w-full rounded-md py-2 px-4 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-400',
        isDisabled ? 'opacity-50 bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700',
        className,
      ].join(' ')}
      {...rest}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
};

export default Button;
