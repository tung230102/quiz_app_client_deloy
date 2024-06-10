import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { createUser, getListUsers, removeUser, updateUser } from "~/api";
import {
  CommonButton,
  CommonConfirmationModal,
  CommonSingleSelect,
  CommonTable,
  Loading,
  showToast,
} from "~/common";
import { statusCode } from "~/constants";
import { useTitleDynamic } from "~/hooks";
import { dateFormat } from "~/utils";
import UserCreateUpdateModal from "./UserCreateUpdateModal";

const initQueryParamValue = {
  sortField: "created_at",
  keyWord: "",
  order: "DESC",
  page: 1,
  size: 10,
};

function UserManagement() {
  useTitleDynamic("Users Management");
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [queryParams, setQueryParams] = useState(initQueryParamValue);
  const [filterValue, setFilterValue] = useState({});
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [userToUpdate, setUserToUpdate] = useState({
    id: "",
    name: "",
    email: "",
    roles: [],
  });
  const [userToDelete, setUserToDelete] = useState({ id: "", name: "" });

  const columns = [
    {
      field: "index",
      headerName: "ID",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
    },
    {
      field: "avatar_link",
      headerName: "Avatar",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Avatar src={params.row.avatar_link} variant="rounded" />
      ),
    },
    {
      field: "createdAt",
      headerName: "Create At",
      flex: 1,
      renderCell: (params) => <>{dateFormat(params.row.createdAt)}</>,
    },
    {
      field: "updatedAt",
      headerName: "Update At",
      flex: 1,
      renderCell: (params) => <>{dateFormat(params.row.updatedAt)}</>,
    },
    {
      field: "roles",
      headerName: "Roles",
      flex: 1,
      sortable: false,
      renderCell: (params) => <>{params?.row?.roles?.join(", ")}</>,
    },
    {
      field: "action",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <ButtonGroup variant="text">
          <Button
            color="warning"
            onClick={() => {
              setShowModalCreate(true);
              setUserToUpdate({
                id: params.row.id,
                name: params.row.name,
                email: params.row.email,
                roles: params.row.roles,
              });
            }}
            startIcon={<EditIcon />}
          />
          <Button
            color="error"
            onClick={() => {
              setShowModalDelete(true);
              setUserToDelete({
                id: params.row.id,
                name: params.row.name,
              });
            }}
            startIcon={<DeleteIcon />}
          />
        </ButtonGroup>
      ),
    },
  ];

  const rowsData = listUsers?.map((row, index) => ({
    ...row,
    index: index + 1,
  }));

  /* Handler */
  const handleChangePage = (event, newPage) => {
    setQueryParams((pre) => ({ ...pre, page: newPage }));
  };

  const handleChangePageSize = (newSize) => {
    setQueryParams((pre) => ({ ...pre, size: newSize.pageSize, page: 1 }));
  };

  const handleChangeSearch = (keyWord) => {
    setQueryParams((pre) => ({ ...pre, keyWord, page: 1 }));
  };

  const handleChangeSort = (sortField, order) => {
    setQueryParams((pre) => ({ ...pre, order, sortField }));
  };

  const handleChangeFilter = (key, value) => {
    setFilterValue((pre) => ({ ...pre, [key]: value }));
  };

  const handleClearFilter = () => {
    setFilterValue({});
    setQueryParams(initQueryParamValue);
  };

  const handleSubmitFilter = () => {
    setQueryParams((pre) => ({ ...pre, ...filterValue, page: 1 }));
  };

  const queryListUser = async () => {
    setIsLoading(true);
    getListUsers(queryParams).then((res) => {
      if (res) {
        const users = res?.result;
        const totalPage = res?.totalPages;
        setListUsers(users);
        setTotalPages(totalPage);
      } else {
        showToast("Get users fail!", "error");
      }
      setIsLoading(false);
    });
  };

  const handleCreateUser = (data) => {
    createUser(data).then((res) => {
      if (res?.statusCode === statusCode.CREATED) {
        showToast(res?.message);
        setShowModalCreate(false);

        queryListUser();
      } else if (res?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else {
        showToast("Create user fail!", "error");
      }
    });
  };

  const handleUpdateUser = (data) => {
    updateUser(userToUpdate.id, data).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);
        setShowModalCreate(false);
        setUserToUpdate({});

        queryListUser();
      } else if (res?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else {
        showToast("Update user fail!", "error");
      }
    });
  };

  const handleDeleteUser = () => {
    removeUser(userToDelete.id).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);

        queryListUser();
      } else if (res?.message) {
        showToast(res?.message, "error");
      } else {
        showToast("Remove user fail", "error");
      }
    });
  };

  /* Effect - Query get list users */
  useEffect(() => {
    queryListUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <Box p={2}>
      <Loading loading={isLoading}>
        {listUsers?.length >= 0 && (
          <CommonTable
            rows={rowsData}
            columns={columns}
            onPagination={handleChangePageSize}
            onChangeSort={handleChangeSort}
            count={totalPages}
            onChangePage={handleChangePage}
            value={initQueryParamValue}
            // search
            placeholder="Search by email, user name"
            onChange={handleChangeSearch}
            onClear={handleClearFilter}
            onSubmit={handleSubmitFilter}
            dropdownContent={
              <Box>
                <CommonSingleSelect
                  label="Roles"
                  value={filterValue.roles}
                  options={[
                    { label: "Admin", value: "admin" },
                    { label: "User", value: "user" },
                  ]}
                  onChange={(value) => handleChangeFilter("roles", value)}
                />
              </Box>
            }
          >
            <CommonButton
              startIcon={<AddIcon />}
              onClick={() => setShowModalCreate(true)}
            >
              Create User
            </CommonButton>
          </CommonTable>
        )}
      </Loading>
      <UserCreateUpdateModal
        open={showModalCreate}
        title={userToUpdate.id ? "Update user" : "Create user"}
        onClose={() => {
          setShowModalCreate(false);
          setUserToUpdate({});
        }}
        onCreate={(data) => handleCreateUser(data)}
        onUpdate={(data) => handleUpdateUser(data)}
        userToUpdate={userToUpdate}
      />
      <CommonConfirmationModal
        open={showModalDelete}
        title="Remove user"
        onClose={() => setShowModalDelete(false)}
        onOk={() => {
          setShowModalDelete(false);
          handleDeleteUser();
        }}
      >
        <p>{`Do you sure want to delete user "${userToDelete.name}"`}</p>
      </CommonConfirmationModal>
    </Box>
  );
}

export default UserManagement;
