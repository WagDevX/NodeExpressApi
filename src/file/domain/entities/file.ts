export interface File {
  id?: number;
  fileName: string;
  downloadUrl: string;
  owner: number;
  ownerName: string;
  extension: string;
  size: number;
  parentFolder?: number;
}
