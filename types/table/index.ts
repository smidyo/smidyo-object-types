export interface TableBody {
  columns: Array<{
    name: string;
    dataShape: {
      type: string;
      nullable: false;
      list: false;
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
