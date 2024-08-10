const handleErrors = (res, error) => {
  let statusCode = error?.status || error?.code;
  let errorMsg = "";

  switch (statusCode) {
    case 404:
      errorMsg = "Not Found";
      break;
    case 403:
      errorMsg = error?.error.message;
      break;
    case 400:
      statusCode = 400;
      errorMsg = error?.error.message;
      break;
    case 11000:
      statusCode = 400;
      errorMsg = "User already exisits"
      break;
    default:
      statusCode = 500;
      errorMsg = "Something went wrong. Please try again later"
  }
  res.status(statusCode).send({
    status: statusCode,
    error: error?._message || errorMsg
  });
}

const isPasswordValid = (passFromDB, currentPass) => {
  return passFromDB === currentPass;
}

const sortProjects = (allProjects) => {
  let archived = allProjects.filter(proj => proj.archived);
  let others = allProjects.filter(proj => !proj.archived);
  return [...others, ...archived]
}

module.exports = {
  handleErrors,
  isPasswordValid,
  sortProjects
}