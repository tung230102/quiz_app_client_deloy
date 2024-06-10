import { Box } from "@mui/material";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DefaultLayout = ({ children }) => {
  return (
    <Box display="flex" overflow="hidden">
      <Sidebar />
      <Box flex={1} sx={{ overflowY: "auto", overflowX: "hidden" }}>
        <Header />

        <Box>{children}</Box>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
