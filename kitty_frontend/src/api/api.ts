const BASE_URL = "http:localhost:8000/documents";

export const fetchDocuments = async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
        throw new Error("Failed to fetch documents");
    }
    return response.json();
}

export const createDocument = async (document: any) => {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(document),
  });
  if (!response.ok) {
    throw new Error("Failed to create document");
  }
  return response.json();
};

export const updateDocument = async (id: number, document: any) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(document),
  });
  if (!response.ok) {
    throw new Error("Failed to update document");
  }
  return response.json();
};

export const deleteDocument = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete document");
  }
  return response.json();
};
