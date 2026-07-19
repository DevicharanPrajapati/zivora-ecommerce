import { useEffect } from "react";
import { useDispatch } from "react-redux";
import AppRoutes from "./routes/AdminRoutes";
import { supabase } from "./services/supabaseAdmin";
import { getProfile } from "./features/auth/authAPI";
import {
  setSession,
  clearSession,
  setInitializing,
} from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        dispatch(clearSession());
        dispatch(setInitializing(false));
        return;
      }

      try {
        const profile = await getProfile(session.user.id);

        if (profile.role !== "admin") {
          await supabase.auth.signOut();
          dispatch(clearSession());
          dispatch(setInitializing(false));
          return;
        }

        dispatch(
          setSession({
            user: profile,
            session,
          }),
        );

        dispatch(setInitializing(false)); // ✅
      } catch (error) {
        console.error(error);
        dispatch(clearSession());
        dispatch(setInitializing(false)); // ✅
      }
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_, session) => {
      if (!session) {
        dispatch(clearSession());
        return;
      }

      try {
        const profile = await getProfile(session.user.id);

        if (profile.role !== "admin") {
          await supabase.auth.signOut();
          dispatch(clearSession());
          dispatch(setInitializing(false));
          return;
        }

        dispatch(
          setSession({
            user: profile,
            session,
          }),
        );
      } catch (error) {
        console.error(error);
        dispatch(clearSession());
        dispatch(setInitializing(false));
      }
    });

    return () => subscription.unsubscribe();
  }, [dispatch]);

  return <AppRoutes />;
}

export default App;
