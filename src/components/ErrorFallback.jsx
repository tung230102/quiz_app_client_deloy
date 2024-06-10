import { Box, Paper } from "@mui/material";
import { CommonButton, Heading } from "../common";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          padding: "20px",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Heading>Something went wrong 😢</Heading>
        <p>{error.message}</p>
        <CommonButton onClick={resetErrorBoundary}>Try again</CommonButton>
      </Paper>
    </Box>
  );
};

export default ErrorFallback;
