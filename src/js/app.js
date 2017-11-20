import Greeter from './greeter';
import '../css/app.scss';

$(() => {
  const greeter = new Greeter(process.env.NODE_ENV);
  console.log(greeter.greet());
});
