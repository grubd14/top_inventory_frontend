const API_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

//function to handle the response from the fetch
async function handleResponse(response) {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }

  // 204 No Content or empty body — nothing to parse
  if (response.status === 204) return null;

  const text = await response.text();
  if (!text) return null;

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return JSON.parse(text);
  }
  return text;
}

//category API
export async function getCategories() {
  const response = await fetch(`${API_BASE}/category`, {
    credentials: "include",
  });
  return handleResponse(response);
}

//get category with id
export async function getCategoriesById(id) {
  const response = await fetch(`${API_BASE}/category/${id}`, {
    credentials: "include",
  });
  return handleResponse(response);
}

//get items by referencing the category id in the item table
// export async function getItemCategoriesById(id) {
//   const response = await fetch(`${API_BASE}/category/${id}`, {
//     credentials: "include",
//   });
//   return handleResponse(response);
// }

// create category
export async function createCategory(body) {
  const response = await fetch(`${API_BASE}/category/create`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}

// update category
export async function updateCategory(body) {
  const { id, ...data } = body;
  const response = await fetch(`${API_BASE}/category/${id}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id, ...data }),
  });
  return handleResponse(response);
}

// delete category
export async function deleteCategory(id) {
  const response = await fetch(`${API_BASE}/category/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(response);
}

//---Items API----
// get items
export async function getItems() {
  const response = await fetch(`${API_BASE}/item`, {
    credentials: "include",
  });
  return handleResponse(response);
}

//get item by id
export async function getItemById(id) {
  const response = await fetch(`${API_BASE}/item/${id}`, {
    credentials: "include",
  });
  return handleResponse(response);
}

//add item
export async function addItem(body) {
  const response = await fetch(`${API_BASE}/item/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}

//update item
export async function updateItem(body) {
  const { id, ...data } = body;
  const response = await fetch(`${API_BASE}/item/${id}/update`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id, ...data }),
  });
  return handleResponse(response);
}

//update quantity
export async function updateItemQuantity(body) {
  const { id, quantity } = body;
  const response = await fetch(`${API_BASE}/item/${id}/updateQuantity`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ id, quantity }),
  });
  return handleResponse(response);
}

//delete item
export async function deleteItem(id) {
  const response = await fetch(`${API_BASE}/item/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  return handleResponse(response);
}

// Auth API
// login user
export async function loginUser(body) {
  const response = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}

//logout user
export async function logoutUser() {
  const response = await fetch(`${API_BASE}/logout`, {
    method: "POST",
    credentials: "include",
  });
  return handleResponse(response);
}

//register user
export async function registerUser(body) {
  const response = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  });
  return handleResponse(response);
}
