import { MemoryRouter } from "react-router-dom";

// pages
import Router from "./router/Router";

// context
import { withUserContext } from "../context/UserContext";


function App() {
  
  return (
    <MemoryRouter>
      <Router/>
    </MemoryRouter>
  );
}

export default withUserContext(App);
