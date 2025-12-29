import { BrowserRouter } from "react-router-dom";
import Routing from "./Routing";
import { useContext, useEffect } from "react";
import { DataContext } from "./components/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";

function App() {
  const [, dispatch] = useContext(DataContext);
  useEffect(() => {
    auth.onAuthStateChanged((authuser) => {
      if (authuser) {
        dispatch({
          type: Type.SET_USER,
          user: authuser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Routing />
      <footer
        style={{ textAlign: "center", fontSize: "0.8em", marginTop: "20px" }}
      >
        This is an educational project and is not affiliated with or endorsed by
        Amazon.com.
      </footer>
    </BrowserRouter>
  );
}

export default App;
