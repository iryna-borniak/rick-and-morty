import React from 'react';

import { Character } from '../../types/Characters';
import './CharacterUI.scss';

type Props = {
  character: Character;
};

export const CharacterUI: React.FC<Props> = ({ character }) => {
  const { name, image, gender, status, species, type, origin } = character;

  return (
    <div className="character">
      <img className="character__image" src={image} alt={name} />
      <h1>{name}</h1>
      <h6 className="character__title">Informations</h6>
      <div className="character__item">
        <p className="character__subtitle">Gender</p>
        <p className="character__text">{gender}</p>
      </div>
      <div className="character__item">
        <p className="character__subtitle">Status</p>
        <p className="character__text">{status}</p>
      </div>
      <div className="character__item">
        <p className="character__subtitle">Specie</p>
        <p className="character__text">{species}</p>
      </div>
      <div className="character__item">
        <p className="character__subtitle">Origin</p>
        <p className="character__text">{origin.name}</p>
      </div>
      <div className="character__item">
        <p className="character__subtitle">Type</p>
        {type.trim().length === 0 ? (
          <p className="character__text">Unknown</p>
        ) : (
          <p className="character__text">{type}</p>
        )}
      </div>
    </div>
  );
};
