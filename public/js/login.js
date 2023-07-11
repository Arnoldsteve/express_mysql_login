form.addEventListener("submit", () => {
  const login = {
    email: email.value,
    password: password.value,
  };
  fetch("/aapi/login", {
    method: "POST",
    body: JSON.stringify(login),
    headers: {
      "content-type": "application/json",
    },
  })
    .then(res.json())
    .then((data) => {
      if (data.status == "error") {
        success.style.display = "none";
        error.style.display = "block";
        error.innerText = data.error;
      } else {
        error.style.display = "none";
        error.style.display = "block";
        success.innerText = data.success;
      }
    });
});
