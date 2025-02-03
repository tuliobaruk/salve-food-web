"use client";
import { useReducer, useEffect } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "./form";
import { Input } from "./input";
import { UseFormReturn } from "react-hook-form";

type MoneyInputProps = {
  form: UseFormReturn<any>;
  name: string;
  label: string;
  placeholder: string;
};

const moneyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export default function MoneyInput({ form, name, label, placeholder }: MoneyInputProps) {
  const initialValue = form.getValues()[name]
    ? moneyFormatter.format(form.getValues()[name])
    : "";

  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, "");
    return moneyFormatter.format(Number(digits) / 100);
  }, initialValue);

  useEffect(() => {
    form.setValue(name, initialValue.replace(/[^0-9,]/g, "").replace(",", "."));
  }, [initialValue, form, name]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const formattedValue = event.target.value;
    const digits = formattedValue.replace(/\D/g, "");
    const realValue = Number(digits) / 100;
    form.setValue(name, realValue.toFixed(2));
    setValue(formattedValue);
  }

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}