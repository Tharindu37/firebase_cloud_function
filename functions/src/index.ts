// ESM
import * as v2 from "firebase-functions/v2";
import * as v1 from "firebase-functions/v1";

// CJS
// const functions= require('firebase-functions');

type Indexable = { [key: string]: any };

export const hellworld = v2.https.onRequest((request, response) => {
  debugger;
  const name = request.params[0].replace("/", "");
  const items: Indexable = { lamp: "This is a lamp", chair: "Good chair" };
  const message = items[name];
  response.send(`<h1>${message}</h1>`);
});
// CJS
// exports.hellworld =

type Sku = { name: string; usd: number; eur?: number };
const USD_TO_EUROS = 0.54;
export const newsku = v1.firestore
  .document("/inventory/{sku}")
  .onCreate((snapshot) => {
    const data = snapshot.data() as Sku;
    const eur = data.usd * USD_TO_EUROS;
    // const promise = snapshot.ref.update({ eur });
    // return snapshot.ref.update({ eur });
    return snapshot.ref.set({ eur, ...data }, { merge: true });
  });
