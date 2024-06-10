import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  CommonBoxModal,
  CommonButton,
  CommonMultipleSelect,
  CommonTextField,
  Heading,
} from "~/common";
import { debounce } from "lodash";

const UserCreateUpdateModal = ({
  open = false,
  onClose = () => {},
  title = "",
  onCreate = () => {},
  userToUpdate = {},
  onUpdate = () => {},
}) => {
  const { id, roles, ...updateValues } = userToUpdate;
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
    const roles = userToUpdate?.roles?.map((role) => ({
      value: role,
      label: role,
    }));
    const newDataUpdate = { ...updateValues, roles };

    reset(isUpdateSession ? newDataUpdate : {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, userToUpdate]);

  const handleClickCreate = debounce(onCreate, 100);
  const handleClickUpdate = debounce(onUpdate, 100);
  const handleClickClose = debounce(onClose, 100);

  const onSubmit = (data) => {
    const roles = getValues("roles")?.map((role) => role.value);
    const newData = { ...data, roles };

    if (isUpdateSession) {
      handleClickUpdate(newData);
    } else {
      handleClickCreate(newData);
    }
  };

  return (
    <CommonBoxModal open={open} onClose={handleClickClose}>
      <Heading>{title}</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CommonTextField
          label="Name"
          name="name"
          register={register}
          errors={errors}
          required
        />
        <CommonTextField
          label="Email"
          name="email"
          register={register}
          errors={errors}
          required
          pattern={{
            value: /\S+@\S+\.\S+/,
            message: "Please provide a valid email",
          }}
          disabled={isUpdateSession}
        />
        {!isUpdateSession && (
          <>
            <CommonTextField
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
              required
              minLength={8}
            />
            <CommonTextField
              label="Password Confirm"
              name="passwordConfirm"
              type="password"
              register={register}
              errors={errors}
              required
              minLength={8}
            />
          </>
        )}

        <CommonMultipleSelect
          control={control}
          error={errors?.roles?.message}
        />

        <CommonButton fullWidth sx={{ mt: 1 }}>
          {isUpdateSession ? "Update" : "Create"}
        </CommonButton>
      </form>
    </CommonBoxModal>
  );
};

export default UserCreateUpdateModal;
