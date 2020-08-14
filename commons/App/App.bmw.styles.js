import { styled } from '@egoist/vue-emotion';
import commons from './App.styles';

const Main = styled(commons.Main)`
  background-color: unset;

  background-image: linear-gradient(
    90deg,
    #0665b1,
    #0665b1 33%,
    #023d78 33%,
    #023d78 66%,
    #e22718 66%
  );
`;

const HelloWorld = styled(commons.HelloWorld)`
  color: #d6d6d6;
`;

export default {
  ...commons,
  Main,
  HelloWorld,
};
