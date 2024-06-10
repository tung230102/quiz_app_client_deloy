import { Box, Grid, Paper } from "@mui/material";
import { useTitleDynamic } from "~/hooks";
import ChangePasswordField from "./ChangePasswordField";
import UploadAvatarField from "./UploadAvatarField";

const paperStyle = {
  margin: "20px auto",
  padding: "20px",
  minWidth: "360px",
  maxWidth: "400px",
};

function Profile() {
  useTitleDynamic("Profile");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={1} />
        <Grid item xs={5}>
          <Paper elevation={8} style={paperStyle}>
            <ChangePasswordField />
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper elevation={8} style={paperStyle}>
            <UploadAvatarField />
          </Paper>
        </Grid>
        <Grid item xs={1} />
      </Grid>
    </Box>
  );
}

export default Profile;
