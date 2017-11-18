import Greeter from './greeter';
import '../css/app.scss';

$(() => {
  const greeter = new Greeter('Webpack');
  console.log(greeter.greet());
});
