import { Box, Paper } from "@mui/material";
import { CommonButton, Heading } from "../common";
import { useMoveBack, useTitleDynamic } from "../hooks";

const PageNotFound = () => {
  useTitleDynamic("Page Not Found");
  const moveBack = useMoveBack();

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
        <Heading>The page you are looking for could not be found 😢</Heading>
        <CommonButton onClick={moveBack} variant="outlined">
          &larr; Go back
        </CommonButton>
      </Paper>
    </Box>
  );
};

export default PageNotFound;
