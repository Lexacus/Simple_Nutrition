import { FC, HTMLAttributes, forwardRef } from 'react';

type InputProps = HTMLAttributes<HTMLInputElement> & {
  label?: string;
  type?: 'number' | 'text';
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, ...props }, ref) => {
    return (
      <div className='flex flex-col '>
        {label && <span>{label}</span>}
        <input ref={ref} type={type} {...props} />
      </div>
    );
  }
);
