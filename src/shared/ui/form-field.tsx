"use client";

import type { HTMLInputTypeAttribute, ChangeEvent } from "react";

type FormFieldTheme = "light" | "dark";

interface FormFieldProps {
  readonly label: string;
  readonly name: string;
  readonly type?: HTMLInputTypeAttribute;
  readonly value: string;
  readonly onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  readonly placeholder?: string;
  readonly required?: boolean;
  readonly maxLength?: number;
  readonly minLength?: number;
  readonly theme?: FormFieldTheme;
}

const THEME_CLASSES: Record<FormFieldTheme, string> = {
  light: "border-ink bg-surface text-ink placeholder:text-meta",
  dark: "border-border bg-transparent text-surface placeholder:text-muted",
};

export function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
  maxLength,
  minLength,
  theme = "light",
}: FormFieldProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-mono text-sm font-bold uppercase tracking-widest text-meta block mb-2"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        className={`w-full border-2 p-4 font-mono text-sm focus:outline-none focus:border-brand ${THEME_CLASSES[theme]}`}
      />
    </div>
  );
}
