import { FullDataShape } from '../data-shape';
import {
  AssertPipelineStep,
  BasePipelineBody,
  BasePipelineStep,
  EffectBlock_PipelineStep,
  PipelineInput,
  PipelineOutput,
  PipelineStepInFromInlineValue,
  PipelineStepInFromInlineValueOrPipelineValue,
  PipelineStepInTo,
  PipelineStepOutFrom,
  PipelineStepOutToPipelineValue,
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

export type YieldPipelineOrderStep =
  | SubProcessPipeline_YieldPipelineStep
  | SourceBlock_YieldPipelineStep
  | EffectBlock_YieldPipelineStep
  | AssertPipelineStep;

export interface YieldPipelineBody extends BasePipelineBody {
  type: 'YIELD';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  titleFrom?: PipelineStepInFromInlineValueOrPipelineValue;
  quoteInfoPoints: YieldPipelineInfoPoint[];
  quotePriceSequence: YieldPipelineQuotePriceSequenceStep[];
  quoteSteps: YieldPipelineQuoteStep[];
  orderInfoPoints: YieldPipelineInfoPoint[];
  orderSteps: YieldPipelineOrderStep[];
}

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

export interface YieldPipelineInfoPoint {
  title: string;
  /** @pattern "^[a-z0-9-]*$" */
  name: string;

  dataShape: FullDataShape;

  elementBlock: string;
  elementBlockInput: string;
  elementBlockConfiguration: Array<PipelineStepInFromInlineValue & PipelineStepInTo>;
}

abstract class SubYieldPipeline_PipelineStep implements BasePipelineStep {
  type: 'QUOTING_SUB_YIELD_PIPELINE' | 'ORDERING_SUB_YIELD_PIPELINE';

  /** @pattern "^[a-z0-9-.]*$" */
  subYieldPipelineSlug: string;
  in: Array<(PipelineStepInFromInlineValueOrPipelineValue) & PipelineStepInTo>;
  priceSequenceOut: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
  totalPriceOut?: PipelineStepOutToPipelineValue;
  quoteInfoPointsOut: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

/*

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

//
//
//

export interface QuoteRunYieldPipelineResult {
  type: 'QUOTE_RUN_YIELD_PIPELINE_RESULT';
  title: string;
  infoPoints: InfoPointResult[];
  priceSequence: PriceSequenceStepResult[];
  totalPrice: number;
}

export interface PriceSequenceStepResult {
  type: 'ADD' | 'SUBTRACT' | 'MINIMUM' | 'PERCENTAGE_OFF' | 'PERCENTAGE_ON' | 'MULTIPLY';
  name: string;
  title: string;
  specification?: string;
  data: number;
}

export interface InfoPointResult {
  name: string;
  title: string;
  data: any;
}
