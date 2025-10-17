import { Controller } from "react-hook-form";
const FormField = ({ control, label, name, Component, isCenter }) => {
  return (
    <div
      className={`ml-[20px] flex gap-x-4 p-4 ${isCenter ? "items-center" : ""}`}
    >
      <p className="font-bold text-amber-200">{label}:</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name } }) => {
          return (
            <Component
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
