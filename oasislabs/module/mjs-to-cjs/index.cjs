import('./add.mjs').then(({ add }) => console.log(add(2, 1)))
import('./sub.mjs').then((sub) => console.log(sub.default(2, 1)))
