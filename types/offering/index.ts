export interface OfferingBody {
  payloadFormPipelineSlug?: string;
  payloadFormPipelineToYieldPipelineConnections: Record<string, string>;
  yieldPipelineSlug: string;
  quoteResultFormPipelineSlug?: string;
  yieldPipelineToQuoteResultFormPipelineConnections: Record<string, string>;
  orderResultFormPipelineSlug?: string;
  yieldPipelineToOrderResultFormPipelineConnections: Record<string, string>;
  subRows: Array<OfferingSubRow>;
  quoteMinimumBasePrice?: {
    type: 'ADD' | 'MINIMUM';
    from:
      | { type: 'STATIC'; value: number }
      | { type: 'PIPELINE_VALUE'; pipelineValue: string };
  };
  addToShippingPrice?:
    | { type: 'STATIC'; value: number }
    | { type: 'PIPELINE_VALUE'; pipelineValue: string };
  titleFromPipelineValue?: string;
}

export type OfferingSubRowValueType =
  | 'ADD'
  | 'SUBTRACT'
  | 'MINIMUM'
  | 'PERCENTAGE_OFF'
  | 'PERCENTAGE_ON'
  | 'MULTIPLY';

export interface OfferingSubRow {
  titleFrom:
    | { type: 'STATIC'; title: string }
    | { type: 'PIPELINE_VALUE'; pipelineValue: string };
  skipUnlessPipelineValue?: string;
  value?: {
    type: OfferingSubRowValueType;
    from:
      | { type: 'STATIC'; value: number }
      | { type: 'PIPELINE_VALUE'; pipelineValue: string };
  };
}

export interface OfferingResult {
  type: 'OFFERING_RESULT';
  title: string;
  totalPrice: number;
  quoteMinimumBasePrice?: {
    type: 'ADD' | 'MINIMUM';
    value: number;
  };
  addToShippingPrice?: number;
  subRows?: Array<{
    title: string;
    value?: { type: OfferingSubRowValueType; value: number };
  }>;
}
