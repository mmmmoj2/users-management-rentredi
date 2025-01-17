export const ZOOM_TO_MILES_MAP: { [key: number]: number } = {
  15: 5,
  14: 10,
  13: 20,
  12: 30,
  11: 40,
  10: 50,
};

export const getRadius = (zoom: number): number => {
  if (!zoom) return ZOOM_TO_MILES_MAP[14];
  if (zoom > 15) return ZOOM_TO_MILES_MAP[15];
  if (zoom < 10) return ZOOM_TO_MILES_MAP[10];
  return ZOOM_TO_MILES_MAP[zoom];
};
