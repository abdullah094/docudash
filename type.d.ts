export type fileItem = {
  name: string;
  selected?: boolean;
  exists: true;
  uri: string;
  size: number;
  isDirectory: boolean;
  modificationTime: number;
  md5?: string;
};

declare module "@env" {
  export const GOOGLE_MAPS_APIKEY: string;
}
declare module "*.png" {
  const value: import("react-native").ImageSourcePropType;
  export default value;
}
