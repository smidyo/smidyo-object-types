export interface TableBody {
  columns: Array<{
    name: string;
    dataShape: {
      type: string;
      nullable: boolean;
      list: boolean;
    };
  }>;
  data: {
    'row-names': {
      [rowName: string]: [string];
    };
    [columnName: string]: {
      [rowName: string]: any[];
    };
  };
}
