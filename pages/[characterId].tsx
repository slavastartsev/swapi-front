import { CSSProperties } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import {
  Box,
  Center,
  NavLink,
  Skeleton,
  Space,
  Text,
  Title,
} from '@mantine/core';
import { useQuery } from 'react-query';
import { IconChevronLeft } from '@tabler/icons';

import { QueryKey } from '../config/queryKeys';
import { getCharacter } from '../services/peopleService';
import { fieldOrder, labelByField } from '../config/pageConfig';

const title = 'Character info';

const contentWrapperStyles: CSSProperties = { marginLeft: 36 };

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
          <div style={contentWrapperStyles} key={field}>
            <Space h="xs" />
            <Text span>
              <Skeleton height={21} visible={isLoading}>
                <Text weight={700} span>
                  {labelByField[field]}
                </Text>{' '}
                {data?.[field]}
              </Skeleton>
            </Text>
          </div>
        ))}
        <Space h="xl" />
        <NavLink
          label="Back"
          icon={<IconChevronLeft size={12} stroke={1.5} />}
          onClick={router.back}
        />
      </Box>
    </Center>
  );
};

export default CharacterPage;
