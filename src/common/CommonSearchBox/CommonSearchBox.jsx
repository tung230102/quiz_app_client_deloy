import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { Box, IconButton, InputBase, Menu, Paper } from "@mui/material";
import { debounce } from "lodash";
import { useState } from "react";
import { CommonButton } from "../CommonButton/CommonButton";

export const CommonSearchBox = ({
  onChange,
  placeholder,
  dropdownContent,
  onClear,
  onSubmit,
}) => {
  const [openFilter, setOpenFilter] = useState(false);

  const handleChangeSearch = debounce((e) => {
    onChange && onChange(e?.target?.value);
  }, 200);

  const handleClear = () => {
    setOpenFilter(false);
    onClear && onClear();
  };

  const handleSubmit = () => {
    setOpenFilter(false);
    onSubmit && onSubmit();
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "10px",
        display: "flex",
        alignItems: "center",
        width: 400,
        ml: 1,
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder || "Search"}
        onChange={handleChangeSearch}
      />

      {dropdownContent && (
        <>
          <IconButton
            color="primary"
            aria-label="directions"
            onClick={(event) => setOpenFilter(event.currentTarget)}
          >
            <FilterAltIcon />
          </IconButton>
          <Menu
            id="basic-menu-filter"
            anchorEl={openFilter}
            open={Boolean(openFilter)}
            onClose={() => setOpenFilter(null)}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            {dropdownContent}
            <Box display="flex" justifyContent="space-evenly">
              <CommonButton color="inherit" onClick={handleClear}>
                Reset
              </CommonButton>
              <CommonButton onClick={handleSubmit}>Submit</CommonButton>
            </Box>
          </Menu>
        </>
      )}
    </Paper>
  );
};
