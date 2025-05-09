export function getCurrentSeasonName(): string {
  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  let season = "";

  if (month >= 2 && month <= 4) {
    season = "Spring";
  } else if (month >= 5 && month <= 7) {
    season = "Summer";
  } else if (month >= 8 && month <= 10) {
    season = "Fall";
  } else {
    season = "Winter";
  }

  return `${season} ${year}`;
}

export function safeString(
  value: string | null | undefined,
  fallback = "-"
): string {
  return typeof value === "string" && value.trim() !== "" ? value : fallback;
}
