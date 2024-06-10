import { Avatar, Box, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { updateCurrentUser, uploadAvatar } from "~/api";
import {
  CommonButton,
  CommonTextField,
  CommonUploadFile,
  Heading,
  showToast,
} from "~/common";
import { authKey, statusCode } from "~/constants";
import { setDataLocalStorage, userDataLocalStorage } from "~/utils";

function UploadAvatarField() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar_link, setAvatar_link] = useState("");
  const { email, avatar, name, userData } = userDataLocalStorage();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    setIsLoading(true);
    if (!file) return;
    const formData = new FormData();
    formData.append("avatar", file);

    uploadAvatar(formData).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);
        setAvatar_link(res.data);
        const dataUserReceived = {
          ...userData,
          avatarLink: res?.data,
        };
        setDataLocalStorage(authKey.userData, dataUserReceived);
      } else if (res?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else {
        showToast("Upload avatar fail!", "error");
      }
      setIsLoading(false);
    });
    setFile(null);
  };

  const onSubmit = (data) => {
    const newData = { ...data, avatar_link };

    setIsLoading(true);
    updateCurrentUser(newData).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);

        const dataUserReceived = {
          ...userData,
          email: res?.data?.user?.email,
          userName: res?.data?.user?.name,
        };
        setDataLocalStorage(authKey.userData, dataUserReceived);
      } else if (res?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else {
        showToast("Update user fail!", "error");
      }
      setIsLoading(false);
      setAvatar_link("");
    });
  };

  useEffect(() => {
    reset({ email, name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      {email && name && (
        <>
          <Grid align="center">
            <Avatar src={avatar} alt="avatar" />
            <Heading>Change User Data</Heading>
          </Grid>
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
            />
            <CommonTextField
              label="Avatar"
              name="avatar_link"
              disabled={true}
              value={avatar}
            />
            <CommonUploadFile
              onChange={handleFileChange}
              file={file}
              onUpload={handleUpload}
              disabled={!file || isLoading}
              progress={isLoading}
            />
            <CommonButton fullWidth sx={{ mt: 1 }}>
              Change Data
            </CommonButton>
          </form>
        </>
      )}
    </Box>
  );
}

export default UploadAvatarField;
