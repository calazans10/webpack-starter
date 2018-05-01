import Greeter from './greeter';
import '../styles/main.scss';

$(() => {
  const greeter = new Greeter(process.env.NODE_ENV);
  console.log(greeter.greet());
});
