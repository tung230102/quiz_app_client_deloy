import styled from "@emotion/styled";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Box, CircularProgress } from "@mui/material";
import { CommonButton } from "../CommonButton/CommonButton";

const HiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const CommonUploadFile = ({
  onChange,
  file,
  onUpload,
  disabled,
  progress,
}) => {
  return (
    <>
      <Box display="flex" alignItems="center" sx={{ mt: 1, mb: 1 }}>
        <CommonButton
          variant="text"
          component="label"
          role={undefined}
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <HiddenInput
            type="file"
            style={{ display: "none" }}
            onChange={onChange}
          />
        </CommonButton>
        <span>{file ? file.name : "No file selected"}</span>
      </Box>
      <CommonButton
        onClick={onUpload}
        fullWidth={true}
        sx={{ mb: 0 }}
        disabled={disabled}
      >
        {progress ? <CircularProgress size={24} color="inherit" /> : "Upload"}
      </CommonButton>
    </>
  );
};
