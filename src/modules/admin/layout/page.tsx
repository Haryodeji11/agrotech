"use client"
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useRouter } from "next/navigation";
import { ApButton } from "@/components/button/button";
import { signOut } from "firebase/auth";
import { auth } from "../../../../lib/firebase";
import Link from "next/link";


const { Header, Sider, Content } = Layout;

interface IProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<IProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
   const router = useRouter()

  const menu: any = [
    {
      key: "1",
      icon: <UserOutlined />,
      label: <Link href={"/admin-dashboard"} >Dashboard</Link>,
    },
    {
      key: "2",
      icon: <VideoCameraOutlined />,
      label: <Link href={"/admin-dashboard/farmer"} >Farmer</Link>,
    },
    {
      key: "3",
      icon: <VideoCameraOutlined />,
      label: <Link href={"/admin-dashboard/buyer"} >Buyer</Link>,
    },
    {
      key: "4",
      icon: <UploadOutlined />,
      label: <Link href={"/"} >Content Management</Link>,
    },
  ];
console.log(auth, "layaout auth")
  return (
    <Layout className="w-full min-h-screen">
      <Sider style={{
        backgroundColor: "green"
      }}  trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical text-white font-bold text-xl my-5 text-center" >Agrotech</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menu}
          style={{
            background: 'green'
          }}
          
        />
      </Sider>
      <Layout>
        <Header
          className="flex items-center justify-between w-[100%] px-3"
          style={{ background: colorBgContainer }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="w-[10%]"
            // style={{
            //   fontSize: '16px',
            //   width: 64,
            //   height: 64,
            // }}
          />
          <div className="">
            <ApButton onClick={async()=> {
              try {
                await signOut(auth)
                router.push("/login")
              } catch (error) {
                console.error("Error signing out:", error)
              }
              }} className="bg-green-500" title="Sign Out" />
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
