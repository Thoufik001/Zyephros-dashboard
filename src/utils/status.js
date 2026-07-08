export function statusTone(status) {
  if (/high|risk|blocked|critical|delayed|restricted/i.test(status)) return "high";
  if (/medium|watch|pending|gap|review/i.test(status)) return "medium";
  return "low";
}

export function cooTone(status) {
  const tone = statusTone(status);
  if (tone === "high") return "blocked";
  if (tone === "medium") return "cleaning";
  return "available";
}
