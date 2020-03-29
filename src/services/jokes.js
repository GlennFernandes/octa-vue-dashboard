import jokes from '../constants/jokes';

export default () => {
  const joke = jokes[Math.floor(Math.random() * jokes.length)];
  return joke;
};
