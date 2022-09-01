import PagedResults from 'swapi-typescript/dist/models/PagedResults';
import People from 'swapi-typescript/dist/models/People';

import { BASE_URL, PEOPLE_PATH } from '../config/serviceConfig';

export async function getPeople(page: string, search: string) {
  const PEOPLE_URL = new URL(PEOPLE_PATH, BASE_URL);
  PEOPLE_URL.searchParams.set('page', page);
  if (search) {
    PEOPLE_URL.searchParams.set('search', search);
  }
  const response = await fetch(PEOPLE_URL);
  const data: Promise<PagedResults<People>> = await response.json();
  return data;
}

export async function getCharacter(id: string) {
  const PEOPLE_URL = new URL(PEOPLE_PATH + id, BASE_URL);
  const response = await fetch(PEOPLE_URL);
  const data: Promise<People> = await response.json();
  return data;
}
