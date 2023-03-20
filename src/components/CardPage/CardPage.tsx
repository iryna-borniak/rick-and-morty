import React, { useEffect, useState } from 'react';

import { Link, useParams } from 'react-router-dom';
import { getSingleCharacter } from '../../api';
import { Character } from '../../types/Characters';
import { CharacterUI } from '../CharacterUI';
import { ErrorNotification } from '../ErrorNotification';
import './CardPage.scss';

export const CardPage: React.FC = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<Character>();
  const [error, setError] = useState<boolean>(false);

  const fetchSingleCharacter = async () => {
    try {
      if (id) {
        const characterFromServer = await getSingleCharacter(id);
        setCharacter(characterFromServer);
      }
    } catch (error) {
      setError(true);
    }
  };

  useEffect(() => {
    fetchSingleCharacter();
  }, []);

  console.log(character);
  return (
    <div className="character-container">
      <Link className="link" to="/">
        <span className="link__arrow" />
        Go back
      </Link>

      {character && <CharacterUI character={character} />}

      {error && <ErrorNotification />}
    </div>
  );
};
