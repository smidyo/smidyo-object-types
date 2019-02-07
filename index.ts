export interface FullDataShape {
  type: string;
  nullable: boolean;
  list: boolean;
}

export interface PartialDataShape {
  type?: string;
  nullable?: boolean;
  list?: boolean;
}

export type PipelineType = 'PROCESS' | 'FORM' | 'YIELD';

export interface PipelineInput {
  /** @pattern "^[a-z0-9-]*$" */
  name: string;
  dataShape: FullDataShape;
}

export interface PipelineOutput {
  /** @pattern "^[a-z0-9-]*$" */
  name: string;
  dataShape: FullDataShape;
}

export interface BasePipeline {
  type: PipelineType;
}

export interface ProcessPipeline extends BasePipeline {
  type: 'PROCESS';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  steps: Array<
    OperationBlockPipelineStep | SubProcessPipelineBlockPipelineStep | AssertBlockPipelineStep
  >;
}

export interface FormPipeline extends BasePipeline {
  type: 'FORM';
  steps: Array<
    | ElementBlockPipelineStep
    | SubFormPipelineBlockPipelineStep
    | SourceBlockPipelineStep
    | AssertBlockPipelineStep
  >;
}

export interface YieldPipeline extends BasePipeline {
  type: 'YIELD';
  inputs: PipelineInput[];
  titleFrom?: string;
  quoteInfoPoints: YieldPipelineInfoPoint[];
  quotePriceSequence: YieldPipelineQuotePriceSequenceStep[];
  quoteSteps: Array<
    | SubProcessPipelineBlockPipelineStep
    | QuoteSubYieldPipelineBlockPipelineStep
    | SourceBlockPipelineStep
    | AssertBlockPipelineStep
  >;
  orderInfoPoints: YieldPipelineInfoPoint[];
  orderSteps: Array<
    | EffectBlockPipelineStep
    | SourceBlockPipelineStep
    | SubProcessPipelineBlockPipelineStep
    | OrderSubYieldPipelineBlockPipelineStep
    | AssertBlockPipelineStep
  >;
}

export interface YieldPipelineQuotePriceSequenceStep {
  type: 'ADD' | 'SUBTRACT' | 'MULTIPLY';
  titleFrom: PipelineStepInFromInlineValueOrPipelineValue<{
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

type BlockType =
  | 'OPERATION'
  | 'ELEMENT'
  | 'EXTERNAL_SYSTEM_SOURCE'
  | 'INTERNAL_SOURCE'
  | 'EXTERNAL_SYSTEM_EFFECT'
  | 'INTERNAL_EFFECT'
  | 'SUB_PROCESS_PIPELINE'
  | 'SUB_FORM_PIPELINE'
  | 'QUOTING_SUB_YIELD_PIPELINE'
  | 'ORDERING_SUB_YIELD_PIPELINE'
  | 'ASSERT';

export abstract class BasePipelineStep {
  type: BlockType;
}

interface IfableBasePipelineStep extends BasePipelineStep {
  ifPipelineValue?: string;
}

abstract class PipelineStepInFrom<DS = FullDataShape> {
  type: 'INLINE_VALUE' | 'PIPELINE_VALUE';
  inFrom: InlineValue<DS> | string;
}

interface PipelineStepInTo<T = string> {
  inTo: T;
}

export interface InlineValue<DS = FullDataShape> {
  dataShape: DS;
  data: any;
}

export interface PipelineStepInFromInlineValue<DS = FullDataShape> extends PipelineStepInFrom<DS> {
  type: 'INLINE_VALUE';
  inFrom: InlineValue<DS>;
}

export interface PipelineStepInFromPipelineValue extends PipelineStepInFrom {
  type: 'PIPELINE_VALUE';
  inFrom: string;
}

export type PipelineStepInFromInlineValueOrPipelineValue<DS = FullDataShape> =
  | PipelineStepInFromInlineValue<DS>
  | PipelineStepInFromPipelineValue;

export interface PipelineStepOutFrom<T = string> {
  outFrom: T;
}

export interface PipelineStepOutToPipelineValue {
  /** @pattern "^[a-z0-9-]*$" */
  outTo: string;
}

//
//
//

export type SourceOrEffectBlockPipelineStep = SourceBlockPipelineStep | EffectBlockPipelineStep;

export type SourceBlockPipelineStep =
  | InternalSourceBlockConstant
  | InternalSourceBlockTableColumns
  | InternalSourceBlockTableCells
  | ExternalSystemSourceBlockPipelineStep;

export type EffectBlockPipelineStep =
  | InternalEffectBlockTableDeleteRow
  | InternalEffectBlockTableUpdateCell
  | ExternalSystemEffectBlockPipelineStep;

abstract class ExternalSystemSourceOrEffectBlockPipelineStep extends BasePipelineStep {
  type: 'EXTERNAL_SYSTEM_SOURCE' | 'EXTERNAL_SYSTEM_EFFECT';
  in: Array<(PipelineStepInFromInlineValueOrPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface ExternalSystemSourceBlockPipelineStep
  extends ExternalSystemSourceOrEffectBlockPipelineStep {
  type: 'EXTERNAL_SYSTEM_SOURCE';
  sourceBlock: string;
}

export interface ExternalSystemEffectBlockPipelineStep
  extends ExternalSystemSourceOrEffectBlockPipelineStep {
  type: 'EXTERNAL_SYSTEM_EFFECT';
  effectBlock: string;
}

abstract class InternalSourceOrEffectBlockPipelineStep extends BasePipelineStep {
  type: 'INTERNAL_SOURCE' | 'INTERNAL_EFFECT';
}

//

abstract class InternalSourceBlockPipelineStep extends InternalSourceOrEffectBlockPipelineStep {
  type: 'INTERNAL_SOURCE';
  sourceBlock: InternalSourceBlockName;
}

type InternalSourceBlockName = 'CONSTANT' | 'TABLE_COLUMNS' | 'TABLE_CELLS';

export interface InternalSourceBlockConstant extends InternalSourceBlockPipelineStep {
  type: 'INTERNAL_SOURCE';

  sourceBlock: 'CONSTANT';
  constantSlug: string;
  out: PipelineStepOutToPipelineValue;
}

export interface InternalSourceBlockTableColumns extends InternalSourceBlockPipelineStep {
  type: 'INTERNAL_SOURCE';

  sourceBlock: 'TABLE_COLUMNS';
  tableSlug: string;
  tableColumnsSubSlug: string[];
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface InternalSourceBlockTableCells extends InternalSourceBlockPipelineStep {
  type: 'INTERNAL_SOURCE';

  sourceBlock: 'TABLE_CELLS';
  tableSlug: string;
  tableColumnsSubSlug: string[];
  in: PipelineStepInFromInlineValueOrPipelineValue & PipelineStepInTo<'table-row-sub-slug'>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

//

abstract class InternalEffectBlockPipelineStep extends InternalSourceOrEffectBlockPipelineStep {
  type: 'INTERNAL_EFFECT';
  effectBlock: InternalEffectBlockName;
}

type InternalEffectBlockName = 'TABLE_DELETE_ROW' | 'TABLE_UPDATE_CELL';

export interface InternalEffectBlockTableDeleteRow extends InternalEffectBlockPipelineStep {
  type: 'INTERNAL_EFFECT';

  effectBlock: 'TABLE_DELETE_ROW';
  tableSlug: string;
  in: PipelineStepInFromInlineValueOrPipelineValue<{
    type: string;
    nullable: false;
    list: false;
  }> &
    PipelineStepInTo<'delete-table-row-sub-slug'>;
}

type InternalEffectBlockTableUpdateCellOptionIn =
  | PipelineStepInFromInlineValueOrPipelineValue<{
      type: string;
      nullable: false;
      list: false;
    }> &
      PipelineStepInTo<'data'>
  | PipelineStepInFromInlineValueOrPipelineValue<{
      type: string;
      nullable: false;
      list: false;
    }> &
      PipelineStepInTo<'table-column-sub-slug'>;

export interface InternalEffectBlockTableUpdateCell extends InternalEffectBlockPipelineStep {
  type: 'INTERNAL_EFFECT';

  effectBlock: 'TABLE_UPDATE_CELL';
  tableSlug: string;
  tableColumnSubSlug: string;
  in: Array<InternalEffectBlockTableUpdateCellOptionIn>;
}

//
//
//

export interface OperationBlockPipelineStep extends BasePipelineStep {
  type: 'OPERATION';
  /** @pattern "^[a-z0-9-]*$" */
  operationBlockSlug: string;
  in: Array<(PipelineStepInFromInlineValueOrPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface ElementBlockPipelineStep extends BasePipelineStep {
  type: 'ELEMENT';
  /** @pattern "^[a-z0-9-]*$" */
  elementBlockSlug: string;
  in: Array<(PipelineStepInFromInlineValueOrPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface SubProcessPipelineBlockPipelineStep extends IfableBasePipelineStep {
  type: 'SUB_PROCESS_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subProcessPipelineSlug: string;
  in: Array<(PipelineStepInFromInlineValueOrPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface SubFormPipelineBlockPipelineStep extends IfableBasePipelineStep {
  type: 'SUB_FORM_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subFormPipelineSlug: string;
  in: Array<(PipelineStepInFromInlineValueOrPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

abstract class SubYieldPipelineBlockPipelineStep implements IfableBasePipelineStep {
  type: 'QUOTING_SUB_YIELD_PIPELINE' | 'ORDERING_SUB_YIELD_PIPELINE';
  /** @pattern "^[a-z0-9-]*$" */
  ifPipelineValue?: string;

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

export interface AssertBlockPipelineStep extends BasePipelineStep {
  type: 'ASSERT';
  inPriority: PipelineStepInFromPipelineValue[];
  fallback: AssertBlockPipelineStepRejectFallback | AssertBlockPipelineStepFallbackDataFallback;
  out: PipelineStepOutToPipelineValue[];
}

abstract class AssertBlockPipelineStepFallback {
  type: 'REJECT' | 'FALLBACK_DATA';
}

export interface AssertBlockPipelineStepRejectFallback extends AssertBlockPipelineStepFallback {
  type: 'REJECT';
  message: PipelineStepInFromInlineValueOrPipelineValue<{
    type: 'text';
    nullable: false;
    list: false;
  }>;
}

export interface AssertBlockPipelineStepFallbackDataFallback
  extends AssertBlockPipelineStepFallback {
  type: 'FALLBACK_DATA';
  data: PipelineStepInFromInlineValueOrPipelineValue<{
    type: string;
    nullable: false;
    list: boolean;
  }>;
}

//
//
//
//
//

export interface QuoteRunYieldPipelineResult {
  title: string;
  infoPoints: InfoPointResult[];
  priceSequence: PriceSequenceStepResult[];
  totalPrice: number;
}

export interface PriceSequenceStepResult {
  type: 'ADD' | 'SUBTRACT' | 'MULTIPLY';
  name: string;
  title: string;
  data: number;
}

export interface InfoPointResult {
  name: string;
  title: string;
  data: any;
}
