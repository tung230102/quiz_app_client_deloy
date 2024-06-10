import { Box, CircularProgress } from "@mui/material";

export const Loading = ({ loading, children }) => {
  return (
    <Box>
      <Box sx={{ m: 1, position: "relative" }}>
        {children}
        {loading && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.04)",
              zIndex: 999,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress size={40} />
          </Box>
        )}
      </Box>
    </Box>
  );
};
