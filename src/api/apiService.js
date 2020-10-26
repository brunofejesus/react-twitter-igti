import axios from 'axios';
import uuid from 'react-uuid';

const API_URL = 'http://localhost:3001/tweets';

async function getListTweet() {
  const res = await axios.get(API_URL);
  const allTweets = res.data;
  return allTweets;
}

async function insertTweet(value) {
  const tweet = { id: uuid(), value: value };
  const response = await axios.post(API_URL, tweet);
  return response.data;
}

async function deleteTweet(id) {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
}

export { getListTweet, insertTweet, deleteTweet };
