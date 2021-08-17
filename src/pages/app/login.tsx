import React from "react";
import { Redirect } from "react-router-dom";
import { FullscreenLoading, Logo } from "../../components";
import { useRedirect, useUser } from "../../hooks";
import { user } from "../../types";
import { signInWithGoogle, signInWithMicrosoft } from "../../utils/auth";
import { Auth, Firestore } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const LoginPage: React.FC = () => {
  const [auth, authLoading] = useAuthState(Auth);
  const email = authLoading ? "" : auth?.email;
  const [user, userLoading] = useUser(email);
  const [redirectUrl, setRedirectUrl, redirectLoading] = useRedirect(
    user,
    userLoading
  );

  const signInGoogle = async () => {
    try {
      const { user } = await signInWithGoogle();
      if (user && user.email) {
        const res = await Firestore.collection("users").doc(user.email).get();
        if (res.exists) {
          const resData = res.data();
          if (resData && resData.permissions) {
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

  const signInMicrosoft = async () => {
    try {
      const { user } = await signInWithMicrosoft();
      if (user && user.email) {
        const res = await Firestore.collection("users").doc(user.email).get();
        if (res.exists) {
          const resData = res.data();
          if (resData && resData.permissions) {
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
            <button
              onClick={signInGoogle}
              className="bg-lightBlue transform hover:scale-105 transition-transform w-full rounded-full py-3"
            >
              <span className="text-white opacity-80 text-xl font-bold">
                Iniciar sesion con Google
              </span>
            </button>
            <button
              onClick={signInMicrosoft}
              className="bg-lightBlue transform hover:scale-105 transition-transform w-full rounded-full py-3"
            >
              <span className="text-white opacity-80 text-xl font-bold">
                Iniciar sesion con Microsoft
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
