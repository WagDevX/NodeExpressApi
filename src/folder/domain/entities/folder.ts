export interface Folder {
  id?: number;
  name: string;
  owner: number;
  ownerName: string;
  parentFolder?: number;
}
