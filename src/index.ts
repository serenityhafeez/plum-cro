import { greetUser } from '$utils/greet';

window.Webflow ||= [];
window.Webflow.push(() => {
  const name = 'Mohammed Hafeez';
  greetUser(name);
  document.body.style.backgroundColor = "plum";
});
