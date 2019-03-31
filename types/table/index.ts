export interface TableBody {
  columns: Array<
    | {
        name: string;
        dataShape: {
          type: string;
          nullable: false;
          list: false;
        };
        fallbackData: any[];
      }
    | {
        name: string;
        dataShape:
          | {
              type: string;
              nullable: true;
              list: boolean;
            }
          | {
              type: string;
              nullable: false;
              list: true;
            };
        fallbackData?: any[];
      }
  >;
  data: {
    'row-names': {
      [rowName: string]: [string];
    };
    [columnName: string]: {
      [rowName: string]: any[];
    };
  };
}
