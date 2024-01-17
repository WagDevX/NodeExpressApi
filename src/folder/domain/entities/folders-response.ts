export interface FoldersResponse {
  id?: number;
  name: string;
  owner: number;
  ownerName: string;
  parentFolder?: number;
  children?: FoldersResponse[];
}
