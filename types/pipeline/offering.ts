export interface OfferingBody {
  payloadFormPipelineToYieldPipelineConnections: Record<string, string>;
  yieldPipelineToQuoteResultFormPipelineConnections: Record<string, string>;
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
