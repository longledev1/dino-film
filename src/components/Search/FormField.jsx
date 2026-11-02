import { Controller } from "react-hook-form";

const FormField = ({ control, label, name, Component, isCenter }) => {
  const InputComponent = Component;

  return (
    <div
      className={`ml-[20px] flex gap-x-4 p-4 ${isCenter ? "items-center" : ""}`}
    >
      <p className="font-bold text-secondary">{label}:</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <InputComponent
              onChange={onChange}
              value={value}
              name={name}
              control={control}
            />
          );
        }}
      />
    </div>
  );
};

export default FormField;
