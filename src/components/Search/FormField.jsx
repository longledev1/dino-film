import { Controller } from "react-hook-form";
const FormField = ({ control, label, name, Component }) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-bold text-amber-200">{label}</p>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value, name } }) => {
          return <Component onChange={onChange} value={value} name={name} />;
        }}
      />
    </div>
  );
};

export default FormField;
