import styled from "@emotion/styled";
import { Box, Modal } from "@mui/material";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const CommonBoxModal = ({ open, onClose, children, width = 400 }) => {
  return (
    <StyledModal open={open} onClose={onClose}>
      <Box
        width={width}
        bgcolor={"background.default"}
        color={"text.text"}
        p={2}
        borderRadius={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        {children}
      </Box>
    </StyledModal>
  );
};
