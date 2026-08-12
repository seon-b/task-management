function capitalizeUsername(value) {
  let formattedUsername = value.split("");
  formattedUsername[0] = formattedUsername[0].toUpperCase();
  return formattedUsername.join("");
}

function formatUsername(value) {
  if (value.includes("@")) {
    const formattedUsername = value.split("@")[0];
    return capitalizeUsername(formattedUsername);
  } else {
    return value;
  }
}

export { capitalizeUsername, formatUsername };
