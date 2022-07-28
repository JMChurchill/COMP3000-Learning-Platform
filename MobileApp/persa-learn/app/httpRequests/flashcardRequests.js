import * as SecureStore from "expo-secure-store";
import { checkTokenCorrect } from "./checkValidToken";
import { hostAddress } from "./hostAddress";

export const getFlashCardDecksRequest = async () => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch(`${hostAddress()}/decks/view`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};

export const getFlashCardsRequest = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch(
      `${hostAddress()}/decks/flashcards?DeckID=${credentials.deckID}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          autherization: token,
        },
      }
    ).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};

export const createFlashCardDecks = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch(`${hostAddress()}/decks/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};

export const updateDecksRequest = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch(`${hostAddress()}/decks/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};

export const updateFlashCardRequest = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch(`${hostAddress()}/decks/flashcards`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};

export const deleteFlashCardRequest = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch(`${hostAddress()}/decks/flashcards`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};

export const createFlashCardRequest = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch(`${hostAddress()}/decks/flashcards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};

export const deleteFlashCardDeckRequest = async (credentials) => {
  try {
    let token = await SecureStore.getItemAsync("userToken");
    const data = fetch(`${hostAddress()}/decks/delete`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        autherization: token,
      },
      body: JSON.stringify(credentials),
    }).then((data) => data.json());
    checkTokenCorrect(data);

    return data;
  } catch (e) {}
};
