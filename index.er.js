// index.er.js — ARG MANA SAM MSEN SEN.SE ZEN AURA MANA
// ARG = fragt, MANA = trägt, SAM = sammelt, MSEN = misst
// SEN.SE = sendet/sieht, ZEN/AURA/MANA = isoliert

export const ER = {
  vol: "1",
  home: 40,
  schluss: 729,
  isoliert: ["AURA","MANA","ZEN"], // nie mischen
};

export function arg(frage){
  // ARG: nur fragen, nicht antworten
  return { frage, status: "ARG gestellt" };
}
export function sam(liste){
  // SAM: sammeln, nichts löschen
  return [...liste];
}
export function msen(wert){
  // MSEN: messen
  if(wert==null) return { wert, gate:"UNKNOWN", darfWeiter:false };
  const gate = wert>=70 ? "PASS" : wert>=40 ? "TUNE" : "FAIL";
  return { wert, gate, darfWeiter: gate==="PASS" };
}
export function sense(wert, ziel){
  // SEN.SE: nur senden wenn PASS + isoliert
  const m = msen(wert);
  if(!m.darfWeiter) return { ...m, gesendet: false, grund: "wartet" };
  return { ...m, gesendet: true, an: ziel };
}

// Isolation: AURA sieht, MANA trägt, ZEN dreht — getrennt
export function aura(x){ return { zustand:"AURA", sehen:x, tragen:null, drehen:null }; }
export function mana(x){ return { zustand:"MANA", sehen:null, tragen:x, drehen:null }; }
export function zen(x){ return { zustand:"ZEN", sehen:null, tragen:null, drehen:x }; }
