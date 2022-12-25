import React from "react";
import GlobalContext from "../../context/GlobalContext";
import { FcGoogle } from "react-icons/fc";
import {
  signInWithGoogle,
  signOutWithGoogle,
} from "../../firebase/FirebaseUtil";
import { IoPower } from "react-icons/io5";

function UserAuth() {
  const { user, setShowLoading, setToastMessage } =
    React.useContext(GlobalContext);

  const [isLogoutVisible, setIsLogoutVisible] = React.useState(false);

  const handelSignin = () => {
    setShowLoading(true);
    signInWithGoogle().catch((error) => {
      setToastMessage("Error in Sign in. Please try again.");
      setShowLoading(false);
    });
  };

  function handleSignOut(e) {
    setShowLoading(true);
    signOutWithGoogle().catch((error) => {
      setToastMessage("Error in Sign out. Please try again.");
      setShowLoading(false);
    });
  }

  return (
    <>
      {user ? (
        <img
          src={user.photoURL}
          alt="user"
          className="w-8 h-8 rounded-full cursor-pointer"
          onClick={() => setIsLogoutVisible(!isLogoutVisible)}
          title="Logout"
        />
      ) : (
        <button
          onClick={handelSignin}
          className="flex items-center gap-2 px-4 py-2 cursor-pointer text-gray-600 rounded border shadow-sm hover:shadow-md transition-all"
        >
          <FcGoogle size={18} />
          <span className="hidden sm:block text-sm font-medium">Sign In</span>
        </button>
      )}
      {isLogoutVisible && (
        <div
          className="fixed h-screen w-full top-0 left-0 z-50"
          onClick={() => setIsLogoutVisible(false)}
        >
          <div
            className="flex items-center gap-2 absolute top-14 right-4 p-5 rounded border text-sm font-medium bg-white hover:bg-gray-50 cursor-pointer shadow-lg"
            onClick={handleSignOut}
          >
            <span>Logout</span>
            <IoPower color="red" size={20} />
          </div>
        </div>
      )}
    </>
  );
}

export default UserAuth;
