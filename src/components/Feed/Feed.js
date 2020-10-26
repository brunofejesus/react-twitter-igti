import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import css from '../Feed/feed.module.css';

library.add(faTrash);

export default function Feed({ listTweet, onDelete }) {
  const styledIcon = `is-pulled-right ${css.iconTrash} ${css.fasTrash}`;

  const handleOnDeleteTweet = (id) => {
    onDelete(id);
  };
  return (
    <div style={styles.cardContainer} className="container">
      {listTweet.map(({ id, value }) => {
        return (
          <div style={styles.cardTweet} className="card" key={id}>
            <div className="card-content">
              <strong>{value}</strong>
              <FontAwesomeIcon
                className={styledIcon}
                onClick={() => handleOnDeleteTweet(id)}
                icon="trash"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  cardContainer: {
    marginTop: '30px',
  },
  cardTweet: {
    padding: '10px',
    marginTop: '5px',
  },
};
