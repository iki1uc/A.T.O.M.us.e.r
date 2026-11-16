// ato.mi.si.zer — nicht sanktionieren, sondern atomisieren
// sanktion = blockieren / bestrafen / wegnehmen
// ato.mi.si.zer = zerlegen / freigeben / verteilen

function ato_mi_si_zer(input){
  if(input == null) return [];
  const teile = String(input).split(/[·.:/]+/).filter(Boolean);
  return teile.map(t => ({
    atom: t.trim(),
    teilbar: true,
    blockiert: false,
    nutzbar: true
  }));
}

function economy_real(atome){
  // economy real = jedes Atom zählt, nichts wird doppelt gezählt
  // 1 Atom = 1 Wert, 1 Gate, 1 Zug
  return atome.filter(a => a.nutzbar).length;
}

// call:
ato_mi_si_zer("a.to.mi.si.zer");
