import { FullDataShape } from '../data-shape';
import {
  AssertBlockPipelineStep,
  BasePipelineBody,
  BasePipelineStep,
  EffectBlockPipelineStep,
  PipelineInput,
  PipelineOutput,
  PipelineStepInFromInlineValue,
  PipelineStepInFromInlineValueOrPipelineValue,
  PipelineStepInTo,
  PipelineStepOutFrom,
  PipelineStepOutToPipelineValue,
  SkipablePipelineStep,
  SourceBlockPipelineStep,
  SubProcessPipelineBlockPipelineStep
} from './shared';

export type SubProcessPipelineBlockYieldPipelineStep = SubProcessPipelineBlockPipelineStep &
  SkipablePipelineStep;
export type QuoteSubYieldPipelineBlockYieldPipelineStep = QuoteSubYieldPipelineBlockPipelineStep &
  SkipablePipelineStep;
export type OrderSubYieldPipelineBlockYieldPipelineStep = OrderSubYieldPipelineBlockPipelineStep &
  SkipablePipelineStep;
export type SourceBlockYieldPipelineStep = SourceBlockPipelineStep & SkipablePipelineStep;
export type EffectBlockYieldPipelineStep = EffectBlockPipelineStep & SkipablePipelineStep;

export type ProcessPipelineQuoteStep =
  | SubProcessPipelineBlockYieldPipelineStep
  | QuoteSubYieldPipelineBlockYieldPipelineStep
  | SourceBlockYieldPipelineStep
  | AssertBlockPipelineStep;

export type ProcessPipelineOrderStep =
  | SubProcessPipelineBlockYieldPipelineStep
  | OrderSubYieldPipelineBlockYieldPipelineStep
  | SourceBlockYieldPipelineStep
  | EffectBlockYieldPipelineStep
  | AssertBlockPipelineStep;

export interface YieldPipelineBody extends BasePipelineBody {
  type: 'YIELD';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  titleFrom?: PipelineStepInFromInlineValueOrPipelineValue;
  quoteInfoPoints: YieldPipelineInfoPoint[];
  quotePriceSequence: YieldPipelineQuotePriceSequenceStep[];
  quoteSteps: ProcessPipelineQuoteStep[];
  orderInfoPoints: YieldPipelineInfoPoint[];
  orderSteps: ProcessPipelineOrderStep[];
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

abstract class SubYieldPipelineBlockPipelineStep implements BasePipelineStep {
  type: 'QUOTING_SUB_YIELD_PIPELINE' | 'ORDERING_SUB_YIELD_PIPELINE';

  /** @pattern "^[a-z0-9-.]*$" */
  subYieldPipelineSlug: string;
  in: Array<(PipelineStepInFromInlineValueOrPipelineValue) & PipelineStepInTo>;
  priceSequenceOut: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
  totalPriceOut?: PipelineStepOutToPipelineValue;
  quoteInfoPointsOut: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface QuoteSubYieldPipelineBlockPipelineStep extends SubYieldPipelineBlockPipelineStep {
  type: 'QUOTING_SUB_YIELD_PIPELINE';
}

export interface OrderSubYieldPipelineBlockPipelineStep extends SubYieldPipelineBlockPipelineStep {
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
