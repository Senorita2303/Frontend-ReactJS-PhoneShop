import ThemeProvider from './theme';
import ThemeSettings from './component/settings';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loadUser } from "./redux/slices/userSlice";
import Router from './routes';

const App = () => {
  const dispatch = useDispatch();
  toast.configure({
    theme: "colored",
    position: toast.POSITION.TOP_RIGHT,
    autoClose: 2500,
  });

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <>
      <ThemeProvider>
        <ThemeSettings>
          <main>
            <div className="relative bg-bgddv antialiased">
              <Router />
            </div>
          </main>
        </ThemeSettings>
      </ThemeProvider>
    </>
  );
}

export default App;