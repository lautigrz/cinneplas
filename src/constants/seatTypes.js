export const SEAT_TYPES = {
  STANDARD: {
    id: "STANDARD",
    name: "Estándar",
    color: "bg-blue-600 border-blue-400 text-white",
    hoverColor: "hover:bg-blue-500",
    badgeBg: "bg-blue-500/20 text-blue-300 border-blue-500/40",
    icon: "💺",
  },
  VIP: {
    id: "VIP",
    name: "VIP",
    color: "bg-amber-500 border-amber-300 text-black font-bold",
    hoverColor: "hover:bg-amber-400",
    badgeBg: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    icon: "⭐",
  },
  WHEELCHAIR: {
    id: "WHEELCHAIR",
    name: "Accesible",
    color: "bg-purple-600 border-purple-400 text-white",
    hoverColor: "hover:bg-purple-500",
    badgeBg: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    icon: "♿",
  },
  PREMIUM: {
    id: "PREMIUM",
    name: "Premium",
    color: "bg-red-600 border-red-400 text-white",
    hoverColor: "hover:bg-red-500",
    badgeBg: "bg-red-500/20 text-red-300 border-red-500/40",
    icon: "💎",
  },
};

export function getRowLetter(index) {
  let letter = "";
  while (index >= 0) {
    letter = String.fromCharCode((index % 26) + 65) + letter;
    index = Math.floor(index / 26) - 1;
  }
  return letter;
}
