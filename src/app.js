import { http } from "./http.js";
import { ui } from "./ui.js";

// Get posts on load ->
document.addEventListener("DOMContentLoaded", getPosts);

function getPosts() {
  http
    .get("http://localhost:3000/posts")
    .then(data => ui.showPosts(data))
    .catch(err => console.log(err));
}

// Listen for add posts ->
document.querySelector(".post-submit").addEventListener("click", submitPost);

function submitPost() {
  const title = document.querySelector("#title").value;
  const body = document.querySelector("#body").value;

  if (title === "" || body === "") {
    ui.showAlert("Please add fields", "alert alert-danger");
  } else {
    const data = {
      title,
      body
    };

    // Create post ->
    http
      .post("http://localhost:3000/posts", data)
      .then(data => {
        ui.showAlert("Post added!", "alert alert-success");
        ui.clearFields();
        getPosts();
      })
      .catch(err => console.log(err));
  }
}

// Listen for edit state ->
document.querySelector("#posts").addEventListener("click", enableEdit);

function enableEdit(e) {
  e.preventDefault();

  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const title =
      e.target.parentElement.parentElement.previousElementSibling
        .previousElementSibling.textContent;
    const body =
      e.target.parentElement.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      title,
      body
    };

    // Fill form with current post ->
    ui.fillForm(data);
  }
}

// Listen for cancel ->
document.querySelector(".card-form").addEventListener("click", cancelEdit);

function cancelEdit(e) {
  e.preventDefault();

  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }
}
