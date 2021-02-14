export type MaporyMapItem = {
  id: string;
  location: MapLocation;
  visitDate: Date;
};

export type MapLocation = {
  latitude: number;
  longitude: number;
};
