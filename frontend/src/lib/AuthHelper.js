export const formatErrors = (errors) => {
  if (errors['user'] === undefined) {
    return errors;
  } else {
    const { user, ...others } = errors;
    return { ...user, ...others };
  }
};
