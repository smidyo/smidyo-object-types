import {
  AssertPipelineStep,
  BasePipelineBody,
  EffectBlock_PipelineStep,
  PipelineInput,
  PipelineOutput,
  PipelineStepInFromInlineValueOrPipelineValue,
  SkipUnlessPipelineValues,
  SourceBlock_PipelineStep,
  SubProcessPipeline_PipelineStep
} from './shared';

export type SourceBlock_YieldPipelineStep = SourceBlock_PipelineStep &
  SkipUnlessPipelineValues;
export type EffectBlock_YieldPipelineStep = EffectBlock_PipelineStep &
  SkipUnlessPipelineValues;

export type SubProcessPipeline_YieldPipelineStep = SubProcessPipeline_PipelineStep &
  SkipUnlessPipelineValues;

export type YieldPipelineQuoteStep =
  | SubProcessPipeline_YieldPipelineStep
  | SourceBlock_YieldPipelineStep
  | AssertPipelineStep;

/**
 * Order steps are not yet implemented, this may change
 */
export type YieldPipelineOrderStep =
  | SubProcessPipeline_YieldPipelineStep
  | SourceBlock_YieldPipelineStep
  | EffectBlock_YieldPipelineStep
  | AssertPipelineStep;

/**
 * The price is calculated in the order defined in quotePriceSequence
 */
export interface YieldPipelineBody extends BasePipelineBody {
  type: 'YIELD';
  inputs: PipelineInput[];
  quoteOutputs: PipelineOutput[];
  orderOutputs: PipelineOutput[];
  titleFrom?: PipelineStepInFromInlineValueOrPipelineValue;
  quoteSteps: YieldPipelineQuoteStep[];
  orderSteps: YieldPipelineOrderStep[];
}

export interface BaseYieldPipelineResultOutcome {
  type: 'QUOTE_RUN_YIELD_PIPELINE_OUTCOME' | 'ORDER_RUN_YIELD_PIPELINE_OUTCOME';
  title: string;
}

export interface QuoteRunYieldPipelineResultOutcome
  extends BaseYieldPipelineResultOutcome {
  type: 'QUOTE_RUN_YIELD_PIPELINE_OUTCOME';
  quoteResult: Record<string, any[]>;
}

export interface OrderRunYieldPipelineResultOutcome
  extends BaseYieldPipelineResultOutcome {
  type: 'ORDER_RUN_YIELD_PIPELINE_OUTCOME';
  quoteResult: Record<string, any[]>;
  orderResult: Record<string, any[]>;
}

/**
 * FOLLOWING IS DEPRECATED!
 * FOLLOWING IS DEPRECATED!
 * FOLLOWING IS DEPRECATED!
 *
 * Backwards compatible, but Quote Sub-row's should be used instead.
 */

/**
 * You can provide an additional text regarding the specification of this
 * specific price sequence step
 */
export interface YieldPipelineQuotePriceSequenceStep_Deprecated {
  type: 'ADD' | 'SUBTRACT' | 'MINIMUM' | 'PERCENTAGE_OFF' | 'PERCENTAGE_ON' | 'MULTIPLY';
  title: string;
  specification?: PipelineStepInFromInlineValueOrPipelineValue<{
    type: 'text';
    nullable: false;
    list: false;
  }>;
  /** @pattern "^[a-z0-9-]*$" */
  name: string;
}

/**
 * What a yield pipeline outputs in case of a successful outcome
 *
 *
 */

export interface BaseYieldPipelineResultOutcome_Deprecated {
  type: 'QUOTE_RUN_YIELD_PIPELINE_OUTCOME' | 'ORDER_RUN_YIELD_PIPELINE_OUTCOME';
  title: string;
  priceSequenceResults: PriceSequenceStepResult_Deprecated[];
  totalPriceResult: number;
}

export interface QuoteRunYieldPipelineResultOutcome_Deprecated
  extends BaseYieldPipelineResultOutcome_Deprecated {
  type: 'QUOTE_RUN_YIELD_PIPELINE_OUTCOME';
  quoteResult: Record<string, any[]>;
}

export interface OrderRunYieldPipelineResultOutcome_Deprecated
  extends BaseYieldPipelineResultOutcome_Deprecated {
  type: 'ORDER_RUN_YIELD_PIPELINE_OUTCOME';
  quoteResult: Record<string, any[]>;
  orderResult: Record<string, any[]>;
}

export interface PriceSequenceStepResult_Deprecated {
  type: 'ADD' | 'SUBTRACT' | 'MINIMUM' | 'PERCENTAGE_OFF' | 'PERCENTAGE_ON' | 'MULTIPLY';
  name: string;
  title: string;
  specification?: string;
  value: number;
}
