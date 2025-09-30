import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  showToggle?: boolean; // for password show/hide toggle
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  showToggle = false,
  type = 'text',
  className = '',
  ...rest
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  // Determine actual input type if toggle is used
  const actualType = showToggle
    ? showPassword
      ? 'text'
      : 'password'
    : type;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative">
        <input
          type={actualType}
          className={[
            'block w-full rounded-md border px-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400',
            error ? 'border-red-500' : 'border-gray-300',
            showToggle ? 'pr-12' : '',
            className,
          ].join(' ')}
          {...rest}
        />
        {showToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-2 flex items-center px-2 text-sm text-gray-500 hover:text-gray-700"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1 text-xs text-red-600" aria-live="assertive">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;
