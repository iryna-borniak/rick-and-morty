import { Character, Characters } from './types/Characters';

const BASE_URL = 'https://rickandmortyapi.com/api/character/';

export const getCharactersByPage = async (
  page: string
): Promise<Characters> => {
  let response;

  try {
    response = await fetch(`${BASE_URL}?page=${page}`);
  } catch (error) {
    throw new Error();
  }

  return response.json();
};

export const getCharactersByName = async (
  page: string,
  name: string
): Promise<Characters> => {
  let response;

  try {
    response = await fetch(`${BASE_URL}?page=${page}&name=${name}`);
  } catch (error) {
    throw new Error();
  }

  return response.json();
};

export const getSingleCharacter = async (id: string): Promise<Character> => {
  let response;

  try {
    response = await fetch(`${BASE_URL}${id}`);
  } catch (error) {
    throw new Error();
  }

  return response.json();
};
