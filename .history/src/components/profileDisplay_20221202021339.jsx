import { useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../config";

const ProfileDisplay = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div>
      <h1>Profile Display</h1>
      {user && (
        <div>
          <h2>{user.displayName}</h2>
          <h2>{user.email}</h2>
          {/* <img src="" */}
        </div>
      )}
    </div>
  );
};

export default ProfileDisplay;