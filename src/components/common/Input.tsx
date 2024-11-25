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
            "input input-bordered rounded-[8px] px-[10px] py-[2px] min-h-[1rem] h-[2rem]",
            error ? "border-red-600" : ""
          )}
          ref={ref}
          type={type}
          step={0.01}
          value={value}
          {...props}
        />
        {error && (
          <span className={"text-red-600"}>
            {error.type === "required"
              ? "Campo obbligatorio"
              : "Campo non valido"}
          </span>
        )}
      </div>
    );
  }
);
