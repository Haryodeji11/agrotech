import { useField, ErrorMessage } from "formik";
import { ApText } from "../text";

interface IProps {
  label?: string;
  type?: string;
  name: string;
  value?: string;
  className?: string;
  placeHolder?: string;
  onChange?: (arg?: any) => void;
  disabled?: boolean;
  // onChange?:(value:string)=>void;
  [key: string]: any;
  ignoreFormik?: boolean;
  containerClassName?: string | undefined;
}

export const ApTextInput: React.FC<IProps> = ({
  label,
  type,
  name,
  className,
  placeHolder,
  containerClassName,
  disabled,
  ignoreFormik,
  ...props
}) => {
  let formikField = null;
  if (name) {
    const [field, meta] = useField(name);
    formikField = field;
  }

  return (
    <div
      style={{ display: "", flexDirection: "column" }}
      className={`mb-5 ${containerClassName}`}
    >
      {label && (
        <ApText className="cus-sm2:text-xs mb-2" size="sm">
          {label}
        </ApText>
      )}

      {type == "textarea" ? (
        <textarea
          className={`form-control
          block
          w-full
          px-3
          py-1
          text-sm
          cus-sm2:text-xs
          font-normal
          text-gray-700 bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          bg-stone-100
          focus:text-gray-700 focus:bg-white focus:border-gray-200 focus:outline-none
        ${className}`}
          {...formikField}
          {...props}
          name={name}
          rows={4}
          placeholder={placeHolder}
        ></textarea>
      ) : (
        <input
          type={type}
          {...formikField}
          {...props}
          name={name}
          disabled={disabled || false}
          autoComplete="off"
          // onch
          className={`form-control mt-2
          block
          w-full
          text-sm
          cus-sm2:text-xs
          font-normal
          text-gray-700
          bg-clip-padding
          border border-solid border-gray-300
          rounded
          transition
          ease-in-out
          h-10
          p-4
          bg-stone-100
          focus:text-gray-700 focus:bg-white focus:border-gray-200 focus:outline-none
        
          ${className}`}
          placeholder={placeHolder}
        />
      )}

      {!ignoreFormik && (
        <ErrorMessage
          className="text-red-500 mt-2 text-sm"
          name={name}
          component="div"
        />
      )}
    </div>
  );
};
