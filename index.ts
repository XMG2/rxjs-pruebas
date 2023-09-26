import './style.css';

import {
  debounceTime,
  filter,
  fromEvent,
  interval,
  map,
  timer,
  merge,
} from 'rxjs';

fromEvent(document, 'click')
  .pipe(
    debounceTime(200),
    map((event: MouseEvent) => ({ x: event.x, y: event.y }))
  )
  .subscribe(console.log);

// interval(100)
//   .pipe(
//     filter((num) => num % 2 == 0),
//     map((num) => 'num: ' + num)
//   )
//   .subscribe(console.log);
const compulsoryDiscount = (product) => (product.price *= 0.9);
const superPremiumDiscount = (product) => {
  if (product.type === 'SUPER_PREMIUM') {
    product.price *= 0.95;
  }
};
const greatPriceDiscount = (product) => {
  if (product.price > 10000) {
    product.price *= 0.97;
  }
};
const applyDiscounts = (product) => {
  compulsoryDiscount(product);
  superPremiumDiscount(product);
  greatPriceDiscount(product);
};
const product = {
  name: 'Rélox 8000',
  type: 'SUPER_PREMIUM',
  price: 12300,
  description:
    'Reloj de oro bañado en súper oro, con incrustaciones de diamantes y engranajes de plastigoma.',
};
// Aplicamos los descuentos
applyDiscounts(product); // 10201.005
console.log(product.price);
