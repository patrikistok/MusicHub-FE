import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem,  } from "reactstrap";

export const Header = (): JSX.Element => {

  return (
    <div>
      <Navbar color="black" style={{ height: "10vh" }}>
        <NavbarBrand />
        <Nav>
            <NavItem style={{ margin: 5 }}>
              <Link to="/homepage">Home page</Link>
            </NavItem>
        </Nav>
      </Navbar>
    </div>
  );
};