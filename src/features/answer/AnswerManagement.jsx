import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Box, Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  createAnswer,
  getDetailQuestion,
  removeAnswer,
  updateAnswer,
} from "~/api";
import {
  CommonButton,
  CommonConfirmationModal,
  CommonTable,
  Loading,
  showToast,
} from "~/common";
import { statusCode } from "~/constants";
import { useMoveBack, useTitleDynamic } from "~/hooks";
import { dateFormat } from "~/utils";
import AnswerCreateUpdateModal from "./AnswerCreateUpdateModal";

const AnswerManagement = () => {
  useTitleDynamic("Answers Management");
  const { id } = useParams();
  const moveBack = useMoveBack();
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [listAnswers, setListAnswers] = useState([]);
  const [dataToUpdate, setDataToUpdate] = useState({
    id: "",
    content: "",
    is_correct: null,
  });
  const [dataToDelete, setDataToDelete] = useState({ id: "", content: "" });

  const columns = [
    {
      field: "index",
      headerName: "ID",
      width: 70,
      headerAlign: "center",
      align: "center",
      sortable: false,
    },
    {
      field: "content",
      headerName: "Content",
      flex: 1,
      sortable: false,
    },
    {
      field: "correct",
      headerName: "Correct",
      flex: 1,
      sortable: false,
      renderCell: (params) => (
        <>{params.row.is_correct ? "Correct" : "Incorrect"}</>
      ),
    },
    {
      field: "createdAt",
      headerName: "Create At",
      flex: 1,
      sortable: false,
      renderCell: (params) => <>{dateFormat(params.row.createdAt)}</>,
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
              setDataToUpdate({
                id: params.row.id,
                content: params.row.content,
                is_correct: params.row.is_correct,
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
                content: params.row.content,
              });
            }}
            startIcon={<DeleteIcon />}
          />
        </ButtonGroup>
      ),
    },
  ];

  const rowsData = listAnswers?.map((row, index) => ({
    ...row,
    index: index + 1,
  }));

  /* Handler */
  const queryListAnswer = () => {
    setIsLoading(true);
    getDetailQuestion(id).then((res) => {
      if (res) {
        setListAnswers(res?.data?.answers);
      } else {
        showToast("Get answer fail!", "error");
      }
      setIsLoading(false);
    });
  };

  const handleCreateUser = (data) => {
    createAnswer(data).then((res) => {
      if (res?.statusCode === statusCode.CREATED) {
        showToast(res?.message);
        queryListAnswer();
        setShowModalCreate(false);
      } else if (res?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else {
        showToast("Create answer fail!", "error");
      }
    });
  };

  const handleUpdateUser = (data) => {
    updateAnswer(dataToUpdate.id, data).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);
        queryListAnswer();
        setShowModalCreate(false);
        setDataToUpdate({});
      } else if (res?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else {
        showToast("Update answer fail!", "error");
      }
    });
  };

  const handleDeleteAnswer = () => {
    removeAnswer(dataToDelete.id).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);
        queryListAnswer();
      } else if (res?.message) {
        showToast(res?.message, "error");
      } else {
        showToast("Remove answer fail", "error");
      }
    });
  };

  /* Effect - Query get list answers */
  useEffect(() => {
    queryListAnswer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <Box p={2}>
      <CommonButton variant="text" onClick={moveBack}>
        &larr; Go back
      </CommonButton>
      <Loading loading={isLoading}>
        {listAnswers?.length >= 0 && (
          <CommonTable rows={rowsData} columns={columns} showPagination={false}>
            <CommonButton
              startIcon={<AddIcon />}
              onClick={() => setShowModalCreate(true)}
            >
              Create Answer
            </CommonButton>
          </CommonTable>
        )}
      </Loading>
      <AnswerCreateUpdateModal
        open={showModalCreate}
        title={dataToUpdate.id ? "Update answer" : "Create answer"}
        onClose={() => {
          setShowModalCreate(false);
          setDataToUpdate({});
        }}
        onCreate={(data) => handleCreateUser(data)}
        onUpdate={(data) => handleUpdateUser(data)}
        dataToUpdate={dataToUpdate}
      />
      <CommonConfirmationModal
        open={showModalDelete}
        title="Remove answer"
        onClose={() => setShowModalDelete(false)}
        onOk={() => {
          setShowModalDelete(false);
          handleDeleteAnswer();
        }}
      >
        <p>{`Do you sure want to delete answer "${dataToDelete.content}"`}</p>
      </CommonConfirmationModal>
    </Box>
  );
};

export default AnswerManagement;
