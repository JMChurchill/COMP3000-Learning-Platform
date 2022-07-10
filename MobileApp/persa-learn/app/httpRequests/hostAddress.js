export const hostAddress = () => {
  if (__DEV__) {
    // return local address
    // return "http://178.62.104.116:8080";

    return "http://10.0.2.2:8080";
  } else {
    // return production address
    // console.log("Production");
    return "http://178.62.104.116:8080/";
  }
};
