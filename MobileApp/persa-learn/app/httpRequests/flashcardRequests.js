import * as SecureStore from "expo-secure-store";

export const getFlashCardDecksRequest = async () => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/decks/view", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
  }).then((data) => data.json());
  return data;
};

export const getFlashCardsRequest = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch(
    `http://10.0.2.2:8080/decks/flashcards?DeckID=${credentials.deckID}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
    }
  ).then((data) => data.json());
  return data;
};

export const createFlashCardDecks = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/decks/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};

export const updateDecksRequest = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/decks/update", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};

export const updateFlashCardRequest = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/decks/flashcards", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};

export const deleteFlashCardRequest = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/decks/flashcards", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};

export const createFlashCardRequest = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/decks/flashcards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};

export const deleteFlashCardDeckRequest = async (credentials) => {
  let token = await SecureStore.getItemAsync("userToken");
  const data = fetch("http://10.0.2.2:8080/decks/delete", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      autherization: token,
    },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
  return data;
};
