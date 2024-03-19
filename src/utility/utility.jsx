const getUserId = () => localStorage.getItem("userId");

// load user data
const loadUserData = async () => {
  const userId = getUserId();
  try {
    const res = await fetch(
      `https://yescoin-server-btys2.vercel.app/users/${userId}`
    );
    const resData = await res.json();
    return resData;
  } catch (e) {
    console.log("loadUserByReferId error: ", e);
  }
};

// update user
const updateUserCoin = async () => {
  const id = getUserId();
  (async () => {
    const userData = await loadUserData();
    const newPoints = userData?.points + 1;
    try {
      const res = await fetch(
        `https://yescoin-server-btys2.vercel.app/users/${id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ points: newPoints }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      const data = await res.json();
      !data?.acknowledged && alert("Error? Please reload page? try again");
    } catch (e) {
      console.log("updateUser error: ", e);
    }
  })();
};

export { loadUserData, updateUserCoin };
