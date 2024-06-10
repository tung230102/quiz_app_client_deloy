import { Box } from "@mui/material";
import Header from "../components/Header";

const HeaderOnly = ({ children }) => {
  return (
    <Box display="flex" height="100vh" overflow="hidden">
      <Box flex={1} sx={{ overflowY: "auto", overflowX: "hidden" }}>
        <Header />
        <main>
          <Box>{children}</Box>
        </main>
      </Box>
    </Box>
  );
};

export default HeaderOnly;
