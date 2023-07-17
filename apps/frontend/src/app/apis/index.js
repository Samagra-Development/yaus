import routes from "app/constants/Routes";
const getSignUpReqBody = (user) => {
  return {
    registration: {
      applicationId: `${process.env.REACT_APP_APPLICATION_ID}`,
    },
    user: { name: user.name, email: user.email, password: user.password },
  };
};
const getSignInReqBody = (email, password) => {
  return {
    loginId: email,
    password: password,
    applicationId: `${process.env.REACT_APP_APPLICATION_ID}`,
  };
};

const getResponse = async (url, reqBody) => {
  const result = await fetch(url, {
    method: "POST",
    credentials: "omit",
    headers: {
      Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
      "Content-Type": "application/json",
    },

    body: JSON.stringify(reqBody),
  });
  return await result.json();
};

const Login = async (email, password, history) => {
  const reqBody = getSignInReqBody(email, password);
  console.log(reqBody);
  try {
    const result = await getResponse(routes.AUTH_BASE_URL + "/login", reqBody);
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/dashboard");
    console.log("Result");
  } catch (e) {
    console.log(e);
  }
};

const SignUp = async (user, history) => {
  const reqBody = getSignUpReqBody(user);
  try {
    const result = await getResponse(
      routes.AUTH_BASE_URL + "/user/registration",
      reqBody
    );
    localStorage.setItem("user-info", JSON.stringify(result));
    history.push("/dashboard");
  } catch (e) {
    console.log(e);
  }
};

// async function signUp() {
//   const reqBody = apiUtil.getSignUpReqBody({
//     name: name,
//     email: email,
//     password: password,
//   });
//   console.log(reqBody);
//   try {
//     const result = await apiUtil.getResponse(
//       apiUtil.baseUrl + "/user/registration",
//       reqBody
//     );
//     console.log(result);
//     localStorage.setItem("user-info", JSON.stringify(result));
//     history.push("/dashboard");
//   } catch (e) {
//     console.log(e);
//   }
// }
export { getSignUpReqBody, getSignInReqBody, getResponse, Login, SignUp };
