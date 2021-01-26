export const actionResult = (action, successful, serverResponse) => {
  const message = successful
    ? `${action} was successfully completed`
    : `${action} was failed because of errors`;
  const status = successful ? 200 : 400;
  return { status, message, serverResponse };
};
