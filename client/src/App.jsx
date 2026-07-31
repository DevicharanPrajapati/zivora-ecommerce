import AppRoutes from "./routes/AppRoutes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { supabase } from "./services/supabseClient";
import { setSession, clearSession } from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        dispatch(
          setSession({
            user: session.user,
            session,
          }),
        );
      } else {
        dispatch(clearSession());
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        dispatch(
          setSession({
            user: session.user,
            session,
          }),
        );
      } else {
        dispatch(clearSession());
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
