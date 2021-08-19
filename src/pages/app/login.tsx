import React from "react";
import { Redirect } from "react-router-dom";
import { Button, FullscreenLoading, Logo } from "../../components/tickets";
import { useRedirect, useUser } from "../../hooks";
import { user } from "../../types";
import { signInWithGoogle, signInWithMicrosoft } from "../../utils/auth";
import { Auth, Firebase, Firestore } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginPage: React.FC = () => {
  const [auth, authLoading] = useAuthState(Auth);
  const email = authLoading ? "" : auth?.email;
  const [user, userLoading] = useUser(email);
  const [redirectUrl, setRedirectUrl, redirectLoading] = useRedirect(
    user,
    userLoading
  );

  const signIn = async (
    signInFx: () => Promise<Firebase.auth.UserCredential>
  ) => {
    try {
      const { user } = await signInFx();
      if (user && user.email) {
        const res = await Firestore.collection("users").doc(user.email).get();
        if (res.exists) {
          const resData = res.data();
          if (resData) {
            if (resData.uid) {
              const userData = {
                ...resData,
                lastLogin: new Date().getTime(),
              };
              Firestore.collection("users").doc(user.email).update(userData);
            } else if (resData.permissions) {
              const userData: user = {
                displayName: user.displayName,
                departments: [],
                email: user.email,
                lastLogin: new Date().getTime(),
                photoUrl: user.photoURL,
                uid: user.uid,
                permissions: resData.permissions,
              };
              Firestore.collection("users").doc(user.email).update(userData);
            }
          } else {
            setRedirectUrl("/app/oops");
          }
        } else {
          setRedirectUrl("/app/oops");
        }
      } else {
        setRedirectUrl("/app/oops");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="w-screen flex items-center justify-center h-screen bg-darkBlue">
      <FullscreenLoading shown={redirectLoading} />
      {redirectUrl && <Redirect to={redirectUrl} />}
      {!redirectLoading && (
        <div className="bg-white flex flex-col space-y-12 rounded-xl px-24 py-12">
          <Logo height={70} className="pr-4" />
          <div className="flex flex-col space-y-4">
            <Button onClick={() => signIn(signInWithGoogle)}>
              <span className="text-white text-xl font-bold">
                Iniciar sesion con Google
              </span>
            </Button>
            <Button onClick={() => signIn(signInWithMicrosoft)}>
              <span className="text-white text-xl font-bold">
                Iniciar sesion con Microsoft
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
