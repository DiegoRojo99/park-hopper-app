export type RootStackParamList = {
  Home: undefined;
  Explore: undefined;
  ParkDetails: { parkId: string };
};

export type SortOption = "Number of Parks" | "Name (A-Z)" | "Name (Z-A)";
