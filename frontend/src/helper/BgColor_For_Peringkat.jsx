export function BgColorForPeringkat(peringkat) {
  if (peringkat === 1) {
    return "bg-amber-400";
  } else if (peringkat === 2) {
    return "bg-amber-300";
  } else if (peringkat === 3) {
    return "bg-amber-200";
  } else {
    return "bg-slate-50";
  }
}
