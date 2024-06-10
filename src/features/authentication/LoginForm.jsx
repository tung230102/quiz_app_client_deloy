import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Container, Grid, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { login } from "~/api";
import { CommonButton, CommonTextField, Heading, showToast } from "~/common";
import TopBar from "~/components/TopBar";
import { authKey, statusCode } from "~/constants";
import { useTitleDynamic } from "~/hooks";
import { isAuthenticated, setDataLocalStorage } from "~/utils";

const color = blue[800];

const paperStyle = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "300px",
  maxWidth: "400px",
};

function LoginForm() {
  useTitleDynamic("Login");
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
    login(data).then((res) => {
      if (res?.statusCode === statusCode.OK) {
        showToast(res.message);

        const metaData = res?.data;

        const dataUserReceived = {
          email: metaData?.user?.email,
          avatarLink: metaData?.user?.avatar_link,
          userName: metaData?.user?.name,
          role: metaData?.user?.roles,
          id: metaData?.user?.id,
        };

        const tokensReceived = {
          accessToken: metaData?.tokens?.access_token?.access_token,
          refreshToken: metaData?.tokens?.refresh_token?.refresh_token,
        };

        setDataLocalStorage(authKey.userData, dataUserReceived);
        setDataLocalStorage(authKey.tokens, tokensReceived);

        if (res.data.user.roles.includes("admin")) {
          navigate("/dashboard", { replace: true });
        } else {
          navigate("/play", { replace: true });
        }
        reset();
      } else if (res?.error?.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else {
        showToast("Login fail!", "error");
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
              <Heading>Login Form</Heading>
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
            <CommonTextField
              label="Password"
              name="password"
              type="password"
              register={register}
              errors={errors}
              required
              minLength={8}
              disabled={isLoading}
            />
            <CommonButton
              type="submit"
              fullWidth
              sx={{ mt: 2, mb: 2 }}
              disabled={isLoading}
              loading={isLoading}
            >
              Login
            </CommonButton>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <small>
                <Link to="/forgot-password" style={{ color: color }}>
                  Forgot password?
                </Link>
              </small>
              <small>
                Need an account?{" "}
                <Link to="/register" style={{ color: color }}>
                  Register here
                </Link>
              </small>
            </div>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default LoginForm;
