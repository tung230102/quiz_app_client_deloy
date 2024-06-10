import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import { debounce } from "lodash";
import { useState } from "react";
import { CommonButton, CommonTable } from "~/common";
import { useTitleDynamic } from "~/hooks";
import { checkPermission } from "~/utils";

const data = [
  { name: "Nguyen", age: 20 },
  { name: "Huy", age: 21 },
  { name: "Tung", age: 22 },
];

const rowsData = data.map((row, index) => ({
  ...row,
  id: index + 1,
}));

function Dashboard({ authPermissions }) {
  useTitleDynamic("Dashboard");
  const [rows, setRows] = useState(rowsData);
  const hasCreatePermission = checkPermission(authPermissions, "create");
  const hasUpdatePermission = checkPermission(authPermissions, "update");
  const hasRemovePermission = checkPermission(authPermissions, "delete");

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "name", headerName: "Name" },
    { field: "age", headerName: "Age" },
    {
      field: "action",
      headerName: "Actions",
      headerAlign: "center",
      align: "center",
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <>
          <CommonButton
            disabled={!hasUpdatePermission}
            color="warning"
            startIcon={<EditIcon />}
            variant="text"
            onClick={() => alert(`Update ${params.row.id}`)}
          />
          <CommonButton
            disabled={!hasRemovePermission}
            color="error"
            startIcon={<DeleteIcon />}
            variant="text"
            onClick={() => alert("Remove")}
          />
        </>
      ),
    },
  ];

  const handleChangeSearch = debounce((event) => {
    const key = event;
    if (key) {
      const filteredRows = rowsData.filter(
        (item) =>
          item.name.toLowerCase().includes(key.toLowerCase()) ||
          item.age.toString().includes(key)
      );
      setRows(filteredRows);
    } else {
      setRows(rowsData);
    }
  }, 500);

  return (
    <Box p={2}>
      <CommonTable
        columns={columns}
        rows={rows}
        placeholder="Search by name, age"
        onChange={handleChangeSearch}
        dropdownContent={
          <div style={{ paddingLeft: "10px" }}>
            <p>Row 1</p>
            <p>Row 2</p>
            <p>Row 3</p>
          </div>
        }
      >
        <CommonButton disabled={!hasCreatePermission} startIcon={<AddIcon />}>
          Create new
        </CommonButton>
      </CommonTable>
    </Box>
  );
}

export default Dashboard;
