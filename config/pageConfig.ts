import People from 'swapi-typescript/dist/models/People';

// ReadonlyArray<keyof People>
export const fieldOrder = [
  'name',
  'gender',
  'birth_year',
  'skin_color',
  'hair_color',
] as const;

export const tableColumnsByField: Partial<Record<keyof People, string>> = {
  name: 'Name',
  gender: 'Gender',
  birth_year: 'Birth year',
  skin_color: 'Skin color',
  hair_color: 'Hair color',
};

export const labelByField: Partial<Record<keyof People, string>> = {
  name: 'Name:',
  gender: 'Gender:',
  birth_year: 'Birth year:',
  skin_color: 'Skin color:',
  hair_color: 'Hair color:',
};

export const cellWidthByField: Partial<Record<keyof People, number>> = {
  name: 276,
  gender: 166,
  skin_color: 184,
};
