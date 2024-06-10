import { debounce } from "lodash";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  CommonBoxModal,
  CommonButton,
  CommonRadioGroup,
  CommonTextField,
  Heading,
} from "~/common";

const AnswerCreateUpdateModal = ({
  open = false,
  onClose = () => {},
  title = "",
  onCreate = () => {},
  dataToUpdate = {},
  onUpdate = () => {},
}) => {
  const { id } = useParams();
  const { id: idUpdate, ...updateValues } = dataToUpdate;
  const isUpdateSession = Boolean(idUpdate);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm();

  useEffect(() => {
    reset(isUpdateSession ? updateValues : { is_correct: "false" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClickCreate = debounce(onCreate, 100);
  const handleClickUpdate = debounce(onUpdate, 100);
  const handleClickClose = debounce(onClose, 100);

  const onSubmit = (data) => {
    const isCorrectValue =
      data.is_correct === "true" || data.is_correct === true;
    if (isUpdateSession) {
      const newDataUpdate = {
        ...data,
        is_correct: isCorrectValue,
        id: idUpdate,
      };
      handleClickUpdate(newDataUpdate);
    } else {
      const newData = {
        ...data,
        is_correct: isCorrectValue,
        questionId: id,
      };
      handleClickCreate(newData);
    }
  };

  return (
    <CommonBoxModal open={open} onClose={handleClickClose}>
      <Heading>{title}</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommonTextField
          label="Content"
          name="content"
          register={register}
          errors={errors}
          required
        />
        <CommonRadioGroup
          control={control}
          name="is_correct"
          label="Correct"
          options={[
            { value: true, label: "Correct" },
            { value: false, label: "In Correct" },
          ]}
        />
        <CommonButton fullWidth sx={{ mt: 1 }}>
          {isUpdateSession ? "Update" : "Create"}
        </CommonButton>
      </form>
    </CommonBoxModal>
  );
};

export default AnswerCreateUpdateModal;
