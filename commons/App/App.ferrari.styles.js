import { styled } from '@egoist/vue-emotion';
import commons from './App.styles';

const Main = styled(commons.Main)`
  background-color: #c4151c;
`;

const HelloWorld = styled('h1')`
  font-family: serif;

  padding: 32px;

  color: #231f20;
  background-color: #fef200;
  border: 8px solid #099a4e;
  border-radius: 20px;
`;

export default {
  ...commons,
  Main,
  HelloWorld,
};
