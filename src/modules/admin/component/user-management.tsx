"use client";
import { ApTextInput } from "@/components/input/textinput";
import SummaryCard from "@/components/summaryCard";
import SummaryContainer from "@/components/summaryContainer";
import AgTable from "@/components/table";
import { ApText } from "@/components/text";
import Link from "next/link";
import React from "react";

interface IProps {
  data?: any[];
  totalRecords?: number;
  loading?: boolean;
}

const UserManagementPage: React.FC<IProps> = ({
  data,
  totalRecords,
  loading,
}) => {
  console.log(data, "user management data");
  const columns: any = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phone",
    },
    {
      title: "Location",
      dataIndex: "location",
    },
    {
      title: "Action",
      key: "actions",
      align: "right",
      fixed: "right",
      dataIndex: "actions",
      render: (_: any, record: any) => {
        <Link href={""}>
          <ApText>View More</ApText>
        </Link>;
      },
    },
  ];
  return (
    <div>
      <SummaryContainer>
        <SummaryCard title="Total Farmer" value={totalRecords || 0} />
      </SummaryContainer>

      <div className="mt-4">
        <div></div>
        <AgTable columns={columns} dataSource={data} loading={loading} />
      </div>
    </div>
  );
};

export default UserManagementPage;
