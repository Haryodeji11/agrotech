import { useField } from "formik";
import React, { useState } from "react";
import Select from "react-select";

interface IProps {
  label?: string;
  name: string;
  isMulti?: boolean;
  ignoreFormik?: boolean;
  containerClassName?: string | undefined;
  options: Array<{ value: string; label: string }> | any;
  onChange?: (value: any) => void;
}

export const ApSelectInput: React.FC<IProps> = (props) => {
  const {
    label,
    ignoreFormik,
    options,
    isMulti,
    name,
    containerClassName,
    onChange,
  } = props;

  const [value, setValue] = useState();

  let formikField = null as any;
  if (!ignoreFormik && name) {
    formikField = useField(name);
  }

  return (
    <div>
      {label && <p className="cus-sm2:text-xs mb-2 text-sm">{label}</p>}
      <div className={`w-full ${containerClassName}`}>
        <Select
          {...props}
          isMulti={isMulti}
          options={
            !!options?.length
              ? [...options]?.sort((a: any, b: any) =>
                  a.label?.toLowerCase()?.localeCompare(b.label?.toLowerCase())
                )
              : []
            // options
          }
          name={name}
          className="!w-full  rounded-lg"
          value={ignoreFormik ? value : formikField?.[0].value}
          onChange={(val: any) => {
            if (!ignoreFormik) {
              formikField?.[2].setValue(val);
            }
            setValue(val);
            if (onChange) onChange(val);
          }}
        />

        {!ignoreFormik && formikField?.[1].error && (
          <div className="text-red-500">
            {(formikField?.[1].error as any)?.value}
          </div>
        )}
      </div>
    </div>
  );
};
