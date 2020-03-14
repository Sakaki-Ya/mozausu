import animation from "./animation.js";

const { modalIn, modalOut } = animation();

$(".openHowto").on("click", () => {
  $("#video").prop("src", "https://www.youtube.com/embed/1GbHbYI_7OQ");
  if ($("#optPanel").is(":visible")) $("#optPanel").fadeOut(100);
  $("body").prop("id", "inModal");
  $("#howto").addClass("is-active");
  modalIn($("#howto")[0]);
});
$("#openPolicy").on("click", () => {
  $("body").prop("id", "inModal");
  $("#policy").addClass("is-active");
  modalIn($("#policy")[0]);
});
$(".closeModal, .modal-background").on("click", async () => {
  let modal;
  $("body").removeAttr("id", "inModal");
  if ($("#howto").is(":visible")) {
    $("#video").prop("src", "");
    modal = $("#howto");
  }
  if ($("#policy").is(":visible")) modal = $("#policy");
  await modalOut(modal[0]);
  if ($("#view").is(":visible")) $("#optPanel").fadeIn(100);
  modal.removeClass("is-active");
});
