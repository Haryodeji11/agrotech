import { Modal } from "antd";
import React from "react";

export interface IModal<Type> {
  show: boolean;
  data?: any;
  title?: string;
  subTitle?: string;
  type?: Type;
  id?: string;
}

interface IProps {
  title?: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  show: boolean;
  drawer?: boolean;
  width?: number | string;
  maskClosable?: boolean;
  children: React.ReactNode;
  onDimiss?: () => void;
}

export const ApModal: React.FC<IProps> = ({
  title,
  show,
  children,
  onDimiss,
  width = "80%",
  drawer,
  maskClosable,
  subTitle,
}) => {
  return (
    <>
      {show && (
        <Modal
          maskClosable={maskClosable || false}
          title={<p className="text-2xl font-bold capitalize">{title}</p>}
          open={show}
          onCancel={onDimiss}
          footer={null}
          centered
          width={width || "60%"}
          wrapClassName="py-5"
        >
          <div>
            {subTitle && <p className="mb-5 -mt-1">{subTitle}</p>}
            <div className="mt-5">{children}</div>
          </div>
        </Modal>
      )}
    </>
  );
};
