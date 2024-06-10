import { Box } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Select from "react-select";
import { uploadThumbnail } from "~/api";
import {
  CommonBoxModal,
  CommonButton,
  CommonTextField,
  CommonUploadFile,
  Heading,
  showToast,
} from "~/common";
import { statusCode } from "~/constants";

const difficultyOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const QuestionCreateUpdateModal = ({
  open = false,
  onClose = () => {},
  title = "",
  onCreate = () => {},
  dataToUpdate = {},
  onUpdate = () => {},
}) => {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [thumbnail_link, setThumbnail_link] = useState("");
  const { id, ...updateValues } = dataToUpdate;
  const isUpdateSession = Boolean(id);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    getValues,
  } = useForm();

  useEffect(() => {
    const difficulty = difficultyOptions.find(
      (option) => option.value === dataToUpdate.difficulty
    );
    const newDataUpdate = {
      ...updateValues,
      difficulty: difficulty ? [difficulty] : [],
    };
    reset(isUpdateSession ? newDataUpdate : {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClickCreate = debounce(onCreate, 100);
  const handleClickUpdate = debounce(onUpdate, 100);
  const handleClickClose = debounce(onClose, 100);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    setIsLoading(true);
    if (!file) return;
    const formData = new FormData();
    formData.append("thumbnail", file);

    uploadThumbnail(formData).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);
        setThumbnail_link(res.data);
      } else if (res?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else {
        showToast("Upload file fail!", "error");
      }
      setIsLoading(false);
    });
    setFile(null);
  };

  const onSubmit = (data) => {
    const difficultyArray = getValues("difficulty");
    const difficulty = difficultyArray[0]?.value || difficultyArray.value;
    const newData = { ...data, thumbnail_link, difficulty };

    if (isUpdateSession) {
      handleClickUpdate(newData);
    } else {
      handleClickCreate(newData);
    }
    setThumbnail_link("");
  };

  return (
    <CommonBoxModal open={open} onClose={handleClickClose}>
      <Heading>{title}</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommonTextField
          label="Title"
          name="title"
          register={register}
          minLength={10}
          errors={errors}
          required
        />
        <CommonTextField
          label="Category"
          name="category"
          register={register}
          errors={errors}
          required
        />
        <Box mt={1}>
          <Controller
            name="difficulty"
            render={({ field }) => (
              <Select
                {...field}
                options={[
                  { value: "easy", label: "Easy" },
                  { value: "medium", label: "Medium" },
                  { value: "hard", label: "Hard" },
                ]}
              />
            )}
            control={control}
            defaultValue={{ value: "easy", label: "Easy" }}
          />
        </Box>
        <CommonTextField
          label="Thumbnail Link"
          name="thumbnail_link"
          register={register}
          disabled={true}
          value={thumbnail_link ? thumbnail_link : updateValues.thumbnail_link}
        />
        <CommonUploadFile
          onChange={handleFileChange}
          file={file}
          onUpload={handleUpload}
          disabled={!file || isLoading}
          progress={isLoading}
        />
        <CommonButton fullWidth sx={{ mt: 1 }}>
          {isUpdateSession ? "Update" : "Create"}
        </CommonButton>
      </form>
    </CommonBoxModal>
  );
};

export default QuestionCreateUpdateModal;
