import { FC, HTMLAttributes, forwardRef } from "react";
import { FieldError } from "react-hook-form";
import { cn } from "../../utils";

type InputProps = HTMLAttributes<HTMLInputElement> & {
  label?: string;
  type?: "number" | "text";
  error?: FieldError;
  placeholder?: string;
  value?: string;
};

export const Input: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type, error, value, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {label && <span>{label}</span>}
        <input
          className={cn(
            "rounded-[8px] px-[10px] py-[2px] border",
            error ? "border-red-600" : " border-black"
          )}
          ref={ref}
          type={type}
          step={0.01}
          value={value}
          {...props}
        />
        {error && (
          <span>
            {error.type === "required"
              ? "Campo obbligatorio"
              : "Campo non valido"}
          </span>
        )}
      </div>
    );
  }
);
