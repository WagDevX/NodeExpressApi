export interface Permission {
  id: number;
  userId: number;
  folderId: number;
  fileId: number;
  canRead: boolean;
  canWrite: boolean;
  canDelete: boolean;
}
