import Greeter from './greeter';
import '../css/main.scss';

$(() => {
  const greeter = new Greeter(process.env.NODE_ENV);
  console.log(greeter.greet());
});
