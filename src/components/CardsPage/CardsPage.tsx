import React, { useEffect, useState } from 'react';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { getCharactersByPage, getCharactersByName } from '../../api';
import { Character } from '../../types/Characters';
import { NoResults } from '../NoResults';
import { ErrorNotification } from '../ErrorNotification';
import { Card } from '../Card';
import './CardsPage.scss';

export const CardsPage: React.FC = () => {
  const storedPage = localStorage.getItem('page');
  const storedValue = localStorage.getItem('searchValue');
  const initialPage = storedPage ? Number(storedPage) : 1;
  const initialValue = storedValue ? storedValue : '';

  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>(initialValue);
  const [error, setError] = useState<boolean>(false);

  const sortCharactersByName = (characters: Character[]) => {
    return characters.sort((characterA: Character, characterB: Character) =>
      characterA.name.localeCompare(characterB.name)
    );
  };

  const fetchCharactersByPage = async () => {
    try {
      const charactersFromServer = await getCharactersByPage(String(page));
      const charactersData = sortCharactersByName(charactersFromServer.results);
      setCharacters(charactersData);
      setTotalPages(charactersFromServer.info.pages);
    } catch (error) {
      setError(true);
    }
  };

  const fetchCharactersByName = async () => {
    try {
      const charactersFromServer = await getCharactersByName(
        String(page),
        searchValue
      );
      const charactersData = charactersFromServer.results;
      if (charactersData) {
        const sortedData = sortCharactersByName(charactersData);
        setCharacters(sortedData);
        setTotalPages(charactersFromServer.info.pages);
      } else {
        setCharacters([]);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    if (!searchValue) {
      fetchCharactersByPage();
    }
  }, [page]);

  useEffect(() => {
    fetchCharactersByName();
  }, [page, searchValue]);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    localStorage.setItem('page', String(value));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchValue(value);
    localStorage.setItem('searchValue', value);
    localStorage.setItem('page', String(1));
    setPage(1);
  };

  return (
    <div className="cards-container">
      <div className="cards">
        <div className="cards__image" />
        <div className="cards__search">
          <span className="cards__search-icon" />
          <input
            className="cards__input"
            placeholder="Filter by name..."
            type="text"
            value={searchValue}
            onChange={handleInputChange}
          />
        </div>
        {!!characters.length ? (
          <div className="cards__items">
            {characters.map((character: Character) => (
              <Card key={character.id} character={character} />
            ))}
          </div>
        ) : (
          searchValue && <NoResults />
        )}

        {error && <ErrorNotification />}

        {totalPages > 1 && !!characters.length && (
          <div className="cards__pagination">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </div>
        )}
      </div>
    </div>
  );
};
