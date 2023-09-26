import './style.css';

import {
  debounceTime,
  filter,
  fromEvent,
  interval,
  map,
  timer,
  merge,
  share,
} from 'rxjs';

// fromEvent(document, 'click')
//   .pipe(
//     debounceTime(200),
//     map((event: MouseEvent) => ({ x: event.x, y: event.y }))
//   )
//   .subscribe(console.log);
function pruebaObsShare() {
  // interval(x) genera un numero cada x milisegundos
  const intervalo$ = interval(1000).pipe(
    share(), // para que el observable pase a ser multicast en vez de unicast
    filter((num) => num % 2 == 0), //filtrar por los numeros pares
    map((num) => 'num: ' + num) //para cada numero realizar una funcion
    // debounceTime(500) // retrasa los eventos la cantidad de milisegundos indicados
  );
  intervalo$.subscribe((v) => console.log('num: ', v));
  setTimeout(() => {
    intervalo$.subscribe((v) => console.log('valor: ', v));
  }, 3000);
}
function pruebaMerge() {
  const intervalo1$ = interval(1000).pipe(map((num) => 'intervalo1.' + num));
  const intervalo2$ = interval(2000).pipe(map((num) => 'intervalo2.' + num));
  merge(intervalo1$, intervalo2$).subscribe(console.log);
}

// const compulsoryDiscount = (product) => (product.price *= 0.9);
// const superPremiumDiscount = (product) => {
//   if (product.type === 'SUPER_PREMIUM') {
//     product.price *= 0.95;
//   }
// };
// const greatPriceDiscount = (product) => {
//   if (product.price > 10000) {
//     product.price *= 0.97;
//   }
// };
// const applyDiscounts = (product) => {
//   compulsoryDiscount(product);
//   superPremiumDiscount(product);
//   greatPriceDiscount(product);
// };
// const product = {
//   name: 'Rélox 8000',
//   type: 'SUPER_PREMIUM',
//   price: 12300,
//   description:
//     'Reloj de oro bañado en súper oro, con incrustaciones de diamantes y engranajes de plastigoma.',
// };
// // Aplicamos los descuentos
// applyDiscounts(product); // 10201.005
// console.log(product.price);
