import { styled } from '@egoist/vue-emotion';

const Main = styled('main')`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: papayawhip;

  height: 100vh;
  width: 100%;
`;

const HelloWorld = styled('h1')`
  font-family: sans-serif;
  font-size: 48px;

  color: darksalmon;
`;

export default {
  Main,
  HelloWorld,
};
