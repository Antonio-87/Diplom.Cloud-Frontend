import { EditTwoTone, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Badge, Button, Dropdown, Flex } from "antd";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearTokenData } from "../../redux/slices/tokenSlice";
import UploadModal from "../UploadModal/UploadModal";
import UserModal from "./UserModal";

const Header = (): JSX.Element => {
  const userState = useAppSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [userEdit, setUserEdit] = useState(false);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>Username: {userState.user?.username}</span>,
    },
    {
      key: "2",
      label: <span>Full Name: {userState.user?.full_name}</span>,
    },
    {
      key: "3",
      label: <span>Email: {userState.user?.email}</span>,
    },
    {
      key: "4",
      label: (
        <span>
          Edit Profile <EditTwoTone />
        </span>
      ),
      onClick: () => {
        setUserEdit(true);
      },
    },
    {
      key: "5",
      danger: true,
      label: <Link to={"/"}>Logout</Link>,
      onClick: () => {
        localStorage.clear();
        dispatch(clearTokenData());
      },
    },
  ];

  return (
    <Flex align="center" justify="space-between">
      <UserModal
        open={userEdit}
        onClose={() => {
          setUserEdit(false);
        }}
      />
      <UploadModal />
      <img src="/MyCloud.png" alt="MyCloud" style={{ height: "3em" }} />
      {userState.user?.is_staff ? (
        location.pathname === "/admin/" ? (
          <Link to="/">
            <Button danger>My Storage</Button>
          </Link>
        ) : location.pathname.startsWith("/admin/storages/") ? (
          <>
            <Link to="/">
              <Button danger>My Storage</Button>
            </Link>
            <Link to="admin/">
              <Button danger>Admin Panel</Button>
            </Link>
          </>
        ) : (
          <Link to="admin/">
            <Button danger>Admin Panel</Button>
          </Link>
        )
      ) : null}
      <Flex align="center" justify="space-between" gap="1em">
        <Dropdown menu={{ items }} placement="bottomLeft" arrow>
          <Avatar
            style={{ backgroundColor: "#7265e6", cursor: "pointer" }}
            icon={!userState.user?.username && <UserOutlined />}
            size="large"
          >
            {userState.user?.username[0]}
          </Avatar>
        </Dropdown>
        {userState.user?.is_staff && (
          <Badge text="Admin" color="red" status="processing" />
        )}
      </Flex>
    </Flex>
  );
};

export default Header;
