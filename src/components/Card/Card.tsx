import React from 'react';

import { Link } from 'react-router-dom';
import { Character } from '../../types/Characters';
import './Card.scss';

type Props = {
  character: Character;
};

export const Card: React.FC<Props> = ({ character }) => {
  const { id, name, image, species } = character;

  return (
    <Link to={`${id}`} className="card">
      <img className="card__image" src={image} alt={name} />
      <div className="card__info">
        <h6 className="card__title" title={name}>
          {name.length > 18 ? `${name.slice(0, 18)}...` : name}
        </h6>
        <p className="card__text">{species}</p>
      </div>
    </Link>
  );
};
