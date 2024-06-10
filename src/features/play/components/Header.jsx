import { Heading } from "~/common";

const styleHeader = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const Header = () => {
  return (
    <header style={styleHeader}>
      <img
        src="logo192.png"
        alt="React logo"
        style={{ width: "60px", marginRight: "8px" }}
      />
      <Heading color="black" variant="h4">
        The React Quiz
      </Heading>
    </header>
  );
};

export default Header;
