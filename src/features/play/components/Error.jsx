import { Typography } from "@mui/material";

const error = {
  textAlign: "center",
  padding: 20,
  backgroundColor: "#495057",
  borderRadius: 40,
};

function Error() {
  return (
    <Typography variant="h6" style={error}>
      <span>💥</span> There was an error fetching questions.
    </Typography>
  );
}

export default Error;
