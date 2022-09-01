import React, { ChangeEventHandler, CSSProperties } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { Anchor, Input, Pagination, Skeleton, Table } from '@mantine/core';
import { useDebouncedCallback } from 'use-debounce';
import People from 'swapi-typescript/dist/models/People';
import PagedResults from 'swapi-typescript/dist/models/PagedResults';

import { getPeople } from '../services/peopleService';
import { QueryKey } from '../config/queryKeys';
import {
  cellWidthByField,
  fieldOrder,
  tableColumnsByField,
} from '../config/pageConfig';
import { BASE_URL, PERSON_PATH } from '../config/serviceConfig';

const urlPattern = new URLPattern({ pathname: PERSON_PATH, baseURL: BASE_URL });

const controlWrapperStyles: CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '1rem',
};

const isServer = typeof window === 'undefined';

const ENTRIES_PER_PAGE = 10;

const detaultData = {
  results: Array.from(
    { length: ENTRIES_PER_PAGE },
    (_v, i) => i,
  ) as unknown as People[],
  count: 0,
} as PagedResults<People>;

const HomePage: NextPage = () => {
  const router = useRouter();
  const { page: queryPage = '1', search: querySearch = '' } = router.query;

  const updateSearchQueryParameter = (searchValue: string) => {
    if (searchValue) {
      router.query.search = searchValue;
    } else {
      delete router.query.search;
    }
    router.query.page = '1';
    router.push(router);
  };

  const handleSearchChange = useDebouncedCallback<
    ChangeEventHandler<HTMLInputElement>
  >(({ target }) => {
    updateSearchQueryParameter(target.value);
  }, 300);

  const { data = detaultData, isLoading } = useQuery(
    [QueryKey.People, queryPage, querySearch],
    () => getPeople(queryPage as string, querySearch as string),
    {
      enabled: router.isReady,
    },
  );

  const parsedPage = Number.parseInt(queryPage as string, 10);

  // when loading person is equal to 0..9, we can not use it as key source
  const rows = data?.results.map((person, index) => (
    <tr key={index}>
      {fieldOrder.map((field) => (
        <td key={field} width={cellWidthByField[field]}>
          <Skeleton height={21} visible={isLoading || isServer}>
            {field === 'name' ? (
              <Link
                href={
                  (urlPattern.exec(person.url)?.pathname.groups.id as string) ||
                  ''
                }
                passHref
              >
                <Anchor component="a">{person[field]}</Anchor>
              </Link>
            ) : (
              person[field]
            )}
          </Skeleton>
        </td>
      ))}
    </tr>
  ));

  const handleChangePage = (page: number) => {
    router.query.page = page.toString();
    router.push(router);
  };

  const totalPages = Math.ceil(data?.count / 10);

  return (
    <>
      <Table
        striped={!isLoading && !isServer}
        highlightOnHover={!isLoading && !isServer}
      >
        <thead>
          <tr>
            {fieldOrder.map((field) => (
              <th key={field}>{tableColumnsByField[field]}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Skeleton
        height={36}
        visible={isLoading || isServer}
        style={controlWrapperStyles}
      >
        <Input
          autoFocus
          autoComplete="off"
          type="search"
          placeholder="Character name"
          defaultValue={querySearch}
          onChange={handleSearchChange}
        />
        {totalPages > 1 && (
          <Pagination
            page={parsedPage}
            total={totalPages}
            onChange={handleChangePage}
          />
        )}
      </Skeleton>
    </>
  );
};

export default HomePage;
