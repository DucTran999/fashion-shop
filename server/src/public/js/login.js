/* Check click event to show and hide password. */
$(document).ready(() => {
  let showPasswordEle1 = ["#show-password-1", "#enter-password"];
  let showPasswordEle2 = ["#show-password-2", "#re-enter-password"];

  $("#show-password-1").click(() => {
    showPassword(showPasswordEle1[0], showPasswordEle1[1]);
  });

  $("#show-password-2").click(() => {
    showPassword(showPasswordEle2[0], showPasswordEle2[1]);
  });
});

let showPassword = (idElementGetClicked, idElementEffected) => {
  let currentText = $(idElementGetClicked).text();

  // Change state
  if (currentText == "show") {
    $(idElementGetClicked).text("hide");
  } else {
    $(idElementGetClicked).text("show");
  }

  // Change password type.
  let input = $(idElementEffected);
  if (input.attr("type") === "password") {
    input.attr("type", "text");
  } else {
    input.attr("type", "password");
  }
};
