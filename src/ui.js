class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.formState = "add";
  }

  showPosts(posts) {
    let output = "";
    posts.forEach(function(post) {
      output += `<div class="card mb-3">
        <div class="card-body">
          <h4 class="card-title">${post.title}</h4>
          <p class="card-text">${post.body}<p>
          <a href="#" class="edit card-link" data-id="${post.id}">
            <i class="fa fa-pencil"></i>
          </a> 
          <a href="#" class="delete card-link" data-id="${post.id}">
            <i class="fa fa-remove"></i>
          </a>
        </div>
      </div>
      `;
    });

    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();

    const div = document.createElement("div");
    div.className = className;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".postsContainer");
    const posts = document.querySelector("#posts");

    container.insertBefore(div, posts);

    setTimeout(() => {
      this.clearAlert();
    }, 1500);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  clearIdInput() {
    this.idInput = "";
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  changeFormState(type) {
    if (type === "edit") {
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      // Cancel button ->
      const cancelButton = document.createElement("button");
      const cardForm = document.querySelector(".card-form");
      const formEnd = document.querySelector(".form-end");
      cancelButton.className = "post-cancel btn btn-light btn-block";
      cancelButton.appendChild(document.createTextNode("Cancel Edit"));

      cardForm.insertBefore(cancelButton, formEnd);
    } else {
      this.postSubmit.textContent = "Post It";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";

      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }

      this.clearIdInput();
      this.clearFields();
    }
  }
}

export const ui = new UI();
