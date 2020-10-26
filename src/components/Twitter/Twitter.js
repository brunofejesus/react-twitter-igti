import React, { useState, useEffect, Fragment } from 'react';
import Tweet from '../Tweet/Tweet';

import * as api from '../../api/apiService';
import Feed from '../Feed/Feed';

export default function Twitter() {
  const [listTweet, setListTweet] = useState([]);
  const [findNewsTweet, setFindNewsTweet] = useState(false);

  useEffect(() => {
    const getListTweet = async () => {
      console.log('Getting list Twitter....');
      const listTweet = await api.getListTweet();
      setListTweet(listTweet);
    };
    document.querySelector('textarea').focus();
    getListTweet();
  }, [findNewsTweet]);

  const handleOnDelete = async (id) => {
    await api.deleteTweet(id);
    setFindNewsTweet(!findNewsTweet);
  };

  const handleOnInsert = async (value) => {
    await api.insertTweet(value);
    setFindNewsTweet(!findNewsTweet);
  };

  return (
    <Fragment>
      <div
        style={styles.container}
        className="container notification is-primary"
      >
        <h1 className="title has-text-centered ">React Twitter</h1>
      </div>
      <Tweet onInsert={handleOnInsert} />
      <Feed onDelete={handleOnDelete} listTweet={listTweet} />
    </Fragment>
  );
}

const styles = {
  container: {
    marginTop: '10px',
  },
};
