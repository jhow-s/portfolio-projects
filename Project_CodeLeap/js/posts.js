const postsContainer = document.getElementById("posts-container");
const createBtn = document.getElementById("create-btn");
const titleInput = document.getElementById("title");
const contentInput = document.getElementById("content");

let postToDelete = null;
let postToEdit = null;

const deleteModal = document.getElementById("delete-modal");
const cancelDelete = document.getElementById("cancel-delete");
const confirmDelete = document.getElementById("confirm-delete");

const editModal = document.getElementById("edit-modal");
const editTitle = document.getElementById("edit-title");
const editContent = document.getElementById("edit-content");
const cancelEdit = document.getElementById("cancel-edit");
const saveEdit = document.getElementById("save-edit");

async function loadPosts() {
  const posts = await getPosts();
  const currentUser = localStorage.getItem("username");

  postsContainer.innerHTML = "";
  posts
    .sort((a, b) => new Date(b.created_datetime) - new Date(a.created_datetime))
    .forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      const postDate = new Date(post.created_datetime).toLocaleString();
      const showButtons = post.username === currentUser;
      postElement.innerHTML = `
        <div class="post-header">
          <h3>${post.title}</h3>
          ${
            showButtons
              ? `
            <div class="post-actions">
              <button class="delete-btn" data-id="${post.id}">🗑</button>
              <button class="edit-btn" data-id="${post.id}">✏️</button>
            </div>
          `
              : ""
          }
        </div>
       <div class="post-info">
          <span class="post-user">@${post.username}</span>
          <span class="post-date">${postDate}</span>
        </div>
        <div class="post-content">
          ${post.content}
        </div>
      `;

      postsContainer.appendChild(postElement);
      const deleteBtn = postElement.querySelector(".delete-btn");
      const editBtn = postElement.querySelector(".edit-btn");
      if (deleteBtn) {
        deleteBtn.addEventListener("click", () => {
          postToDelete = deleteBtn.dataset.id;
          deleteModal.style.display = "flex";
        });
      }
      if (editBtn) {
        editBtn.addEventListener("click", () => {
          postToEdit = editBtn.dataset.id;
          editTitle.value = post.title;
          editContent.value = post.content;
          editModal.style.display = "flex";
        });
      }
    });
}

createBtn.addEventListener("click", async () => {
  const title = titleInput.value.trim();
  const content = contentInput.value.trim();
  const username = localStorage.getItem("username");
  if (!title || !content) return;
  await createPost(title, content, username);
  titleInput.value = "";
  contentInput.value = "";
  loadPosts();
});

confirmDelete.addEventListener("click", async () => {
  if (!postToDelete) return;
  await deletePost(postToDelete);
  deleteModal.style.display = "none";
  postToDelete = null;
  loadPosts();
});

cancelDelete.addEventListener("click", () => {
  deleteModal.style.display = "none";
  postToDelete = null;
});

saveEdit.addEventListener("click", async () => {
  const newTitle = editTitle.value.trim();
  const newContent = editContent.value.trim();
  if (!newTitle || !newContent) return;
  await editPost(postToEdit, newTitle, newContent);
  editModal.style.display = "none";
  postToEdit = null;
  loadPosts();
});

cancelEdit.addEventListener("click", () => {
  editModal.style.display = "none";
  postToEdit = null;
});

loadPosts();
