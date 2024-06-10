import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Avatar, Container, Grid, Paper } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { register as signUp } from "~/api";
import { CommonButton, CommonTextField, showToast } from "~/common";
import TopBar from "~/components/TopBar";
import { statusCode } from "~/constants";
import { useTitleDynamic } from "~/hooks";
import { isAuthenticated } from "~/utils";

const color = blue[800];

const paperStyle = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "300px",
  maxWidth: "400px",
};

function RegistrationForm() {
  useTitleDynamic("Answer Management");
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
    signUp(data).then((res) => {
      if (res?.statusCode === statusCode.CREATED) {
        navigate("/login");
        showToast(res?.message);
        reset();
      } else if (res.statusCode === statusCode.BAD_REQUEST) {
        showToast(res?.message, "error");
      } else if (res?.error?.code === 11000) {
        showToast("Email already exists", "error");
      } else if (res?.error?.statusCode === 500) {
        showToast("Password Confirm: Passwords are not the same!", "error");
      } else {
        showToast("Register fail!", "error");
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
              <h2>Register Form</h2>
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
              label="Name"
              name="name"
              register={register}
              errors={errors}
              required
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
            <CommonTextField
              label="Password Confirm"
              name="passwordConfirm"
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
              Register
            </CommonButton>
            <small>
              Already have an account?{" "}
              <Link to="/login" style={{ color: color }}>
                Login Here
              </Link>
            </small>
          </form>
        </Paper>
      </Container>
    </>
  );
}

export default RegistrationForm;
