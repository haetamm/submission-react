import { toast } from "sonner";
const BASE_URL = "https://notes-api.dicoding.dev/v1";

function getAccessToken() {
  return localStorage.getItem("accessToken");
}

function putAccessToken(accessToken) {
  return localStorage.setItem("accessToken", accessToken);
}

function handleUnauthorizedError(response) {
  if (response.status === 401) {
    localStorage.removeItem("accessToken");
    window.location.assign("/guest/login");
    toast.error("Session expired. Please log in again.");
    return true;
  }
  return false;
}

async function fetchWithToken(url, options = {}) {
  return fetch(url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
}

async function login({ email, password }, setLoading) {
  try {
    setLoading(true);
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      toast.error(responseJson.message);
      return { error: true, data: null };
    } else {
      localStorage.setItem("accessToken", responseJson.data.accessToken);
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    return { error: true };
  } finally {
    setLoading(false);
  }
}

async function register({ name, email, password }, setLoading) {
  try {
    setLoading(true);
    const response = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const responseJson = await response.json();

    if (responseJson.status !== "success") {
      toast.error(responseJson.message);
      return { error: true };
    }

    return { error: false };
  } catch (error) {
    alert("An error occurred. Please try again.");
    return { error: true };
  } finally {
    setLoading(false);
  }
}

async function getUserLogged() {
  const response = await fetchWithToken(`${BASE_URL}/users/me`);
  if (handleUnauthorizedError(response)) return { error: true, data: null };

  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.data };
}

async function createNote({ title, body }, setLoading) {
  try {
    setLoading(true);
    const response = await fetchWithToken(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    });

    if (handleUnauthorizedError(response)) return { error: true, data: null };

    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    return { error: true };
  } finally {
    setLoading(false);
  }
}

async function getActiveNotes(setLoading) {
  try {
    setLoading(true);
    const response = await fetchWithToken(`${BASE_URL}/notes`);
    if (handleUnauthorizedError(response)) return { error: true, data: null };

    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    return { error: true };
  } finally {
    setLoading(false);
  }
}

async function getArchivedNotes(setLoading) {
  try {
    setLoading(true);
    const response = await fetchWithToken(`${BASE_URL}/notes/archived`);
    if (handleUnauthorizedError(response)) return { error: true, data: null };

    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    return { error: true };
  } finally {
    setLoading(false);
  }
}

async function getNote(id, setLoading) {
  try {
    setLoading(true);
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`);
    if (handleUnauthorizedError(response)) return { error: true, data: null };

    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      toast.error(responseJson.message || "Failed to retrived note.");
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.data };
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    return { error: true };
  } finally {
    setLoading(false);
  }
}

async function archiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/archive`, {
    method: "POST",
  });
  if (handleUnauthorizedError(response)) return { error: true, data: null };

  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    toast.error(responseJson.message || "Failed to archive note.");
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.message };
}

async function unarchiveNote(id) {
  const response = await fetchWithToken(`${BASE_URL}/notes/${id}/unarchive`, {
    method: "POST",
  });
  if (handleUnauthorizedError(response)) return { error: true, data: null };

  const responseJson = await response.json();
  if (responseJson.status !== "success") {
    toast.error(responseJson.message || "Failed to unarchive note.");
    return { error: true, data: null };
  }

  return { error: false, data: responseJson.message };
}

async function deleteNote(id, setLoading) {
  try {
    setLoading(true);
    const response = await fetchWithToken(`${BASE_URL}/notes/${id}`, {
      method: "DELETE",
    });
    if (handleUnauthorizedError(response)) return { error: true, data: null };

    const responseJson = await response.json();
    if (responseJson.status !== "success") {
      toast.error(responseJson.message || "Failed to delete note.");
      return { error: true, data: null };
    }

    return { error: false, data: responseJson.message };
  } catch (error) {
    toast.error("An error occurred. Please try again.");
    return { error: true };
  } finally {
    setLoading(false);
  }
}

export {
  getAccessToken,
  putAccessToken,
  login,
  register,
  getUserLogged,
  createNote,
  getActiveNotes,
  getArchivedNotes,
  getNote,
  archiveNote,
  unarchiveNote,
  deleteNote,
};
