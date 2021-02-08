export interface OfferingBody {
  payloadFormPipelineSlug?: string;
  payloadFormPipelineToYieldPipelineConnections: Record<string, string>;
  yieldPipelineSlug: string;
  quoteResultFormPipelineSlug?: string;
  yieldPipelineToQuoteResultFormPipelineConnections: Record<string, string>;
  orderResultFormPipelineSlug?: string;
  yieldPipelineToOrderResultFormPipelineConnections: Record<string, string>;
  subRows: Array<OfferingSubRow>;
  setQuoteMinimumBasePrice?: { title: string; minimumBasePrice: number };
  addToShippingPriceFromPipelineValue?: { pipelineValue: string; minimumBasePrice: number };
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
  setQuoteMinimumBasePrice?: {
    name: string;
    value: { type: OfferingSubRowValueType; value: number };
  };
  subRows?: Array<{
    title: string;
    value?: { type: OfferingSubRowValueType; value: number };
  }>;
}
