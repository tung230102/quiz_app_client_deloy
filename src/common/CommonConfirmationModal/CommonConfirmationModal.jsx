import { Box, styled } from "@mui/material";
import { debounce } from "lodash";
import { CommonBoxModal, CommonButton, Heading } from "..";

const ButtonContainer = styled(Box)({
  marginTop: 10,
  alignSelf: "flex-end",
});

export const CommonConfirmationModal = ({
  open = false,
  onClose = () => {},
  textCancel = "Cancel",
  onOk = () => {},
  textOk = "Confirm",
  color = "error",
  title = "",
  children = null,
}) => {
  const handleClickOk = debounce(onOk, 100);
  const handleClickClose = debounce(onClose, 100);

  return (
    <CommonBoxModal open={open} onClose={onClose} width={480}>
      <Heading>{title}</Heading>
      {children}
      <ButtonContainer>
        <CommonButton color="inherit" onClick={handleClickClose}>
          {textCancel}
        </CommonButton>
        <CommonButton color={color} onClick={handleClickOk}>
          {textOk}
        </CommonButton>
      </ButtonContainer>
    </CommonBoxModal>
  );
};
