export interface SQLDatabaseWrapper {
  query(queryString: String, queryConfig?: any[]): Promise<{ rows: any[] }>;
}
