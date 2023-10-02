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
  exhaustMap,
  takeUntil,
  take,
  concat,
  of,
  from,
  delay,
  reduce,
  distinctUntilChanged,
  auditTime,
  throttleTime,
  tap,
  range,
  concatMap,
  delayWhen,
  audit,
  timeInterval,
} from 'rxjs';

/*----------------------------------------------------------------------
----------------------------------------------------------------------
----------------------------------------------------------------------*/
// Todo lo que se pueda se debe ejecutar dentro de la funcion pipe

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
    // setTimeout retrasa la ejecucion de algo
    intervalo$.subscribe((v) => console.log('valor: ', v));
  }, 3000);
}
function pruebaMerge() {
  const intervalo1$ = interval(1000).pipe(map((num) => '11##.' + num));
  const intervalo2$ = interval(2000).pipe(map((num) => '22@@.' + num));
  merge(intervalo1$, intervalo2$).subscribe(console.log);
}
function aplicarDescuentos() {
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
}
function pruebaExhaustMap() {
  const clicks = fromEvent(document, 'click');
  const result = clicks.pipe(exhaustMap(() => interval(1000).pipe(take(5))));
  result.subscribe((x) => console.log(x));
}
function consoleLogKeyboard() {
  fromEvent(document, 'keyup')
    .pipe(
      // distinctUntilChanged(
      //   (pre: KeyboardEvent, act: KeyboardEvent) => pre.code == act.code
      // ), // Es necesario que las teclas sean distintas
      throttleTime(50),
      map((e: KeyboardEvent) => e.code)
    )
    // 'Space', 'Enter'
    .subscribe(console.log);
}
function pruebaTap() {
  const num = [];
  range(200)
    .pipe(
      tap((v) => {
        console.log(v);
        num.push(v * 10);
      }),
      map((v) => v * 3),
      filter((v) => v % 15 == 0),
      map((v) => num.push('' + v))
    )
    .subscribe({
      complete: () => {
        console.log(num);
      },
    });
  // of(1, 2, 3)
  //   .pipe(
  //     concatMap((n) =>
  //       interval(1000).pipe(
  //         take(Math.round(Math.random() * 10)),
  //         map(() => 'X'),
  //         tap({ complete: () => console.log(`Done with ${n}`) })
  //       )
  //     )
  //   )
  //   .subscribe(console.log);
}

function clickInterval() {
  fromEvent(document, 'click')
    .pipe(
      timeInterval(), // da un objeto {value: x, interval: y} "y" siendo el tiempo
      // en milisegundos que ha pasado desde la ultima vez que se obtuvo un valor
      map((v) => v.interval)
    )
    .subscribe(console.log);
}
