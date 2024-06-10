import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Container, Grid, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { forgotPassword } from "~/api";
import { CommonButton, CommonTextField, Heading, showToast } from "~/common";
import TopBar from "~/components/TopBar";
import { statusCode } from "~/constants";
import { useMoveBack, useTitleDynamic } from "~/hooks";
import { isAuthenticated } from "~/utils";

const color = blue[800];

const paperStyle = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "300px",
  maxWidth: "400px",
};

function ForgotPasswordForm() {
  useTitleDynamic("Forgot Password");
  const moveBack = useMoveBack();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);
    forgotPassword(data).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res?.message);
        navigate("/login");
        reset();
      } else if (res.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else if (res.statusCode === statusCode.NOT_FOUND) {
        showToast(res?.message, "error");
      } else {
        showToast("Forgot password fail!", "error");
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TopBar />
      <Container>
        <Paper elevation={10} style={paperStyle}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid align="center">
              <Avatar sx={{ bgcolor: color }}>
                <LockOutlinedIcon />
              </Avatar>
              <Heading>Forgot Password Form</Heading>
            </Grid>
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
              disabled={isLoading}
            />
            <CommonButton
              type="submit"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              disabled={isLoading}
              loading={isLoading}
            >
              Submit
            </CommonButton>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <small>
                <Link
                  to="/forgot-password"
                  style={{ color: color }}
                  onClick={moveBack}
                >
                  &larr; Go back
                </Link>
              </small>
            </div>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default ForgotPasswordForm;
