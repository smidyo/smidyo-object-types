export interface TableBody {
  columns: Array<
    | {
        name: string;
        dataShape: {
          type: string;
          nullable: false;
        };
        fallbackData: any;
      }
    | {
        name: string;
        dataShape: {
          type: string;
          nullable: true;
        };
      }
  >;
  data: {
    'row-names': {
      [rowName: string]: string;
    };
    [columnName: string]: {
      [rowName: string]: any;
    };
  };
}