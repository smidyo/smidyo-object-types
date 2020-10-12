import { FullDataShape } from '../data-shape';

/**
 * An inline value needs to define both its data and the data shape of the data.
 */
export interface InlineValue<DS = FullDataShape> {
  dataShape: DS;
  data: any;
}
