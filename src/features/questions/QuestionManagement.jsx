import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Avatar, Box, Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createQuestion,
  getListQuestions,
  removeQuestion,
  updateQuestion,
} from "~/api";
import {
  CommonButton,
  CommonConfirmationModal,
  CommonTable,
  Loading,
  showToast,
} from "~/common";
import { statusCode } from "~/constants";
import { useTitleDynamic } from "~/hooks";
import { dateFormat } from "~/utils";
import QuestionCreateUpdateModal from "./QuestionCreateUpdateModal";

const initQueryParamValue = {
  sortField: "createdAt",
  keyWord: "",
  order: "DESC",
  size: 10,
  page: 1,
};

function QuestionManagement() {
  useTitleDynamic("Questions Management");
  const navigate = useNavigate();
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [queryParams, setQueryParams] = useState(initQueryParamValue);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [listQuestions, setListQuestion] = useState([]);
  const [dataToUpdate, setDataToUpdate] = useState({
    title: "",
    thumbnail_link: "",
    category: "",
    difficulty: "",
  });
  const [dataToDelete, setDataToDelete] = useState({ id: "", title: "" });

  const columns = [
    {
      field: "index",
      headerName: "ID",
      width: 70,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "title",
      headerName: "Title",
      flex: 4,
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "difficulty",
      headerName: "Difficulty",
      flex: 1,
    },
    {
      field: "thumbnail_link",
      headerName: "Thumbnail",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <Avatar src={params.row.thumbnail_link} variant="rounded" />
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
      field: "action",
      headerName: "Actions",
      flex: 1,
      headerAlign: "center",
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <ButtonGroup variant="text">
          <Button
            startIcon={<RemoveRedEyeIcon />}
            onClick={() => navigate(`/questions/${params.row.id}`)}
          />
          <Button
            color="warning"
            onClick={() => {
              setShowModalCreate(true);
              setDataToUpdate({
                id: params.row.id,
                title: params.row.title,
                thumbnail_link: params.row.thumbnail_link,
                category: params.row.category,
                difficulty: params.row.difficulty,
              });
            }}
            startIcon={<EditIcon />}
          />
          <Button
            color="error"
            onClick={() => {
              setShowModalDelete(true);
              setDataToDelete({
                id: params.row.id,
                title: params.row.title,
              });
            }}
            startIcon={<DeleteIcon />}
          />
        </ButtonGroup>
      ),
    },
  ];

  const rowsData = listQuestions?.map((row, index) => ({
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

  const queryListQuestion = () => {
    setIsLoading(true);
    getListQuestions(queryParams).then((res) => {
      if (res) {
        const questions = res?.result;
        const totalPage = res?.totalPages;
        setListQuestion(questions);
        setTotalPages(totalPage);
      } else {
        showToast("Get questions fail!", "error");
      }
      setIsLoading(false);
    });
  };

  const handleCreateQuestion = (data) => {
    createQuestion(data).then((res) => {
      if (res?.statusCode === statusCode.CREATED) {
        showToast(res?.message);
        queryListQuestion();
        setShowModalCreate(false);
      } else if (res?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else if (res?.error?.code === 11000) {
        showToast("Question already exists", "error");
      } else {
        showToast("Create question fail!", "error");
      }
    });
  };

  const handleUpdateQuestion = (data) => {
    updateQuestion(dataToUpdate.id, data).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);
        queryListQuestion();
        setShowModalCreate(false);
        setDataToUpdate({});
      } else if (res?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else {
        showToast("Update question fail!", "error");
      }
    });
  };

  const handleDeleteUser = () => {
    removeQuestion(dataToDelete.id).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);
        queryListQuestion();
      } else if (res?.message) {
        showToast(res?.message, "error");
      } else {
        showToast("Remove question fail", "error");
      }
    });
  };

  /* Effect - Query get list questions */
  useEffect(() => {
    queryListQuestion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <Box p={2}>
      <Loading loading={isLoading}>
        {listQuestions?.length >= 0 && (
          <CommonTable
            rows={rowsData}
            columns={columns}
            onPagination={handleChangePageSize}
            onChangeSort={handleChangeSort}
            count={totalPages}
            onChangePage={handleChangePage}
            value={initQueryParamValue}
            placeholder="Search by title question"
            onChange={handleChangeSearch}
          >
            <CommonButton
              startIcon={<AddIcon />}
              onClick={() => setShowModalCreate(true)}
            >
              Create Question
            </CommonButton>
          </CommonTable>
        )}
      </Loading>
      <QuestionCreateUpdateModal
        open={showModalCreate}
        title={dataToUpdate.id ? "Update question" : "Create question"}
        onClose={() => {
          setShowModalCreate(false);
          setDataToUpdate({});
        }}
        onCreate={(data) => handleCreateQuestion(data)}
        onUpdate={(data) => handleUpdateQuestion(data)}
        dataToUpdate={dataToUpdate}
      />
      <CommonConfirmationModal
        open={showModalDelete}
        title="Remove question"
        onClose={() => setShowModalDelete(false)}
        onOk={() => {
          setShowModalDelete(false);
          handleDeleteUser();
        }}
      >
        <p>{`Do you sure want to delete question "${dataToDelete.title}"`}</p>
      </CommonConfirmationModal>
    </Box>
  );
}

export default QuestionManagement;
