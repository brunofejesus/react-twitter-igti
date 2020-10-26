import React, { useState, useEffect } from 'react';

import * as api from '../../api/apiService';

const MAX_CARACTERES = 280;

export default function Tweet({ onInsert }) {
  const [styledLabel, setStyledLabel] = useState('has-text-primary');
  const [caracteres, setCaracteres] = useState(MAX_CARACTERES);
  const [tweet, setTweet] = useState('');
  const [twittar, setTwittar] = useState(true);

  useEffect(() => {
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  });

  useEffect(() => {
    const twittar = !(tweet.trim().length > 0 && tweet.trim().length <= 280);
    setTwittar(twittar);
  }, [tweet]);

  const cleanForm = () => {
    setTweet('');
    setCaracteres(MAX_CARACTERES);
  };

  const postTwitter = () => {
    onInsert(tweet);
    cleanForm();
  };

  const handleKeyUp = (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
      postTwitter();
    }
  };

  const handleOnChange = (event) => {
    const value = event.target.value;
    const lengthRemaining = MAX_CARACTERES - value.length;
    if (lengthRemaining < 0) setStyledLabel('has-text-danger');
    if (lengthRemaining <= 9 && lengthRemaining >= 0)
      setStyledLabel('has-text-warning');
    if (lengthRemaining > 9) setStyledLabel('has-text-primary');
    setTweet(value);
    setCaracteres(lengthRemaining);
  };

  return (
    <div style={styles.footer} className="container">
      <div className="field">
        <div className="control">
          <label>Escreva aqui:</label>
          <textarea
            value={tweet}
            placeholder="O que você está pensando em twittar ?"
            className="textarea is-primary"
            onChange={handleOnChange}
          ></textarea>
          <div style={styles.footer}>
            <strong className={styledLabel}>
              {caracteres} caracter(es) restante(s)
            </strong>
            <button
              disabled={twittar}
              onClick={postTwitter}
              className="button is-primary is-pulled-right"
            >
              Twittar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  footer: {
    marginTop: '10px',
  },
};
