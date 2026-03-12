const API_URL = "https://dev.codeleap.co.uk/careers/";

async function getPosts() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data.results;
}

async function createPost(title, content, username) {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      title,
      content,
    }),
  });
}

async function deletePost(id) {
  await fetch(`${API_URL}${id}/`, {
    method: "DELETE",
  });
}

async function editPost(id, title, content) {
  await fetch(`${API_URL}${id}/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });
}
