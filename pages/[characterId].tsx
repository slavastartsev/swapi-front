import { CSSProperties } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Box, Center, NavLink, Skeleton, Text, Title } from '@mantine/core';
import { useQuery } from 'react-query';
import { IconChevronLeft } from '@tabler/icons';

import { QueryKey } from '../config/queryKeys';
import { getCharacter } from '../services/peopleService';
import { fieldOrder, labelByField } from '../config/pageConfig';

const title = 'Character info';

const isServer = typeof window === 'undefined';

const CharacterPage: NextPage = () => {
  const router = useRouter();

  const { data, isLoading } = useQuery(
    [QueryKey.Character, router.query.characterId as string],
    () => getCharacter(router.query.characterId as string),
    {
      enabled: router.isReady,
    },
  );

  return (
    <Center>
      <Box>
        <Title order={1}>{title}</Title>
        {fieldOrder.map((field) => (
          <Text key={field} mt="xs" ml="xl">
            <Skeleton height={21} visible={isLoading || isServer}>
              <Text weight={700} span>
                {labelByField[field]}
              </Text>{' '}
              {data?.[field]}
            </Skeleton>
          </Text>
        ))}
        <NavLink
          label="Back"
          icon={<IconChevronLeft size={12} stroke={1.5} />}
          onClick={router.back}
          mt="xl"
        />
      </Box>
    </Center>
  );
};

export default CharacterPage;
