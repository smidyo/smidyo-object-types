import { FullDataShape } from '../data-shape';
import {
  AssertPipelineStep,
  BasePipelineBody,
  EffectBlock_PipelineStep,
  PipelineInput,
  PipelineStepInFromInlineValue,
  PipelineStepInFromInlineValueOrPipelineValue,
  PipelineStepInTo,
  SourceBlock_PipelineStep,
  SubProcessPipeline_PipelineStep,
  SkipUnlessPipelineValues
} from './shared';

export type SourceBlock_YieldPipelineStep = SourceBlock_PipelineStep & SkipUnlessPipelineValues;
export type EffectBlock_YieldPipelineStep = EffectBlock_PipelineStep & SkipUnlessPipelineValues;

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
  titleFrom?: PipelineStepInFromInlineValueOrPipelineValue;
  quoteInfoPoints: YieldPipelineInfoPoint[];
  quotePriceSequence: YieldPipelineQuotePriceSequenceStep[];
  quoteSteps: YieldPipelineQuoteStep[];
  orderInfoPoints: YieldPipelineInfoPoint[];
  orderSteps: YieldPipelineOrderStep[];
}

/**
 * You can provide an additional text regarding the specification of this
 * specific price sequence step
 */
export interface YieldPipelineQuotePriceSequenceStep {
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
 * Not fully implemented yet
 *
 * This provides information about the product. It's a payloadlet that is stored
 * permanently. You can also provide an element block to view the data with, along
 * with configuration for it
 */
export interface YieldPipelineInfoPoint {
  title: string;
  /** @pattern "^[a-z0-9-]*$" */
  name: string;

  dataShape: FullDataShape;

  elementBlock: string;
  elementBlockInput: string;
  elementBlockConfiguration: Array<PipelineStepInFromInlineValue & PipelineStepInTo>;
}

/*

(ignore this)

Should replace this with internal effect and source blocks.

Quote an offering with an internal source block, and order using an internal effect block.

export interface QuoteSubYieldPipeline_PipelineStep extends SubYieldPipeline_PipelineStep {
  type: 'QUOTING_SUB_YIELD_PIPELINE';
}

export interface OrderSubYieldPipeline_PipelineStep extends SubYieldPipeline_PipelineStep {
  type: 'ORDERING_SUB_YIELD_PIPELINE';

  proposalNameIn?: PipelineStepInFromInlineValueOrPipelineValue<{
    type: 'text';
    nullable: false;
    list: false;
  }>;
  proposalTitleIn?: PipelineStepInFromInlineValueOrPipelineValue<{
    type: 'text';
    nullable: false;
    list: false;
  }>;

  proposalSlugOut?: PipelineStepOutToPipelineValue;
}
*/

/**
 * What a yield pipeline outputs in case of a successful outcome
 */
export interface QuoteRunYieldPipelineResultOutcome {
  type: 'QUOTE_RUN_YIELD_PIPELINE_OUTCOME';
  title: string;
  infoPointResults: InfoPointResult[];
  priceSequenceResults: PriceSequenceStepResult[];
  totalPriceResult: number;
}

export interface PriceSequenceStepResult {
  type: 'ADD' | 'SUBTRACT' | 'MINIMUM' | 'PERCENTAGE_OFF' | 'PERCENTAGE_ON' | 'MULTIPLY';
  name: string;
  title: string;
  specification?: string;
  value: number;
}

export interface InfoPointResult {
  name: string;
  title: string;
  data: any[];
}
