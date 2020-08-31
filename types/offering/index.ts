export interface OfferingBody {
  payloadFormPipelineSlug?: string;
  payloadFormPipelineToYieldPipelineConnections: Record<string, string>;
  yieldPipelineSlug: string;
  quoteResultFormPipelineSlug?: string;
  yieldPipelineToQuoteResultFormPipelineConnections: Record<string, string>;
  orderResultFormPipelineSlug?: string;
  yieldPipelineToOrderResultFormPipelineConnections: Record<string, string>;
  subRows: Array<OfferingSubRow>;
  titleFromPipelineValue?: string;
}

export interface OfferingSubRow {
  titleFrom:
    | { type: 'STATIC'; title: string }
    | { type: 'PIPELINE_VALUE'; pipelineValue: string };
  skipUnlessPipelineValue: string;
  price?: {
    type:
      | 'ADD'
      | 'SUBTRACT'
      | 'MINIMUM'
      | 'PERCENTAGE_OFF'
      | 'PERCENTAGE_ON'
      | 'MULTIPLY';
    from:
      | { type: 'STATIC'; price: number }
      | { type: 'PIPELINE_VALUE'; pipelineValue: string };
  };
}
