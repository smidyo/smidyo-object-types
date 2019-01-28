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
  outputs: PipelineOutput[];
  priceOutputs: YieldPipelinePriceOutput[];
  metadataOutputs: YieldPipelineMetadataOutput[];
  drySteps: Array<
    | SubProcessPipelineBlockPipelineStep
    | DrySubYieldPipelineBlockPipelineStep
    | SourceBlockPipelineStep
    | AssertBlockPipelineStep
  >;
  wetSteps: Array<
    | EffectBlockPipelineStep
    | SourceBlockPipelineStep
    | SubProcessPipelineBlockPipelineStep
    | WetSubYieldPipelineBlockPipelineStep
    | AssertBlockPipelineStep
  >;
}

export interface YieldPipelinePriceOutput {
  type: 'ADD' | 'SUBTRACT' | 'MULTIPLIER';
  /** @pattern "^[a-z0-9-]*$" */
  name: string;
}

export interface YieldPipelineMetadataOutput {
  /** @pattern "^[a-z0-9-]*$" */
  name: string;
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
  | 'DRY_SUB_YIELD_PIPELINE'
  | 'WET_SUB_YIELD_PIPELINE'
  | 'ASSERT';

export abstract class BasePipelineStep {
  type: BlockType;
}

interface IfableBasePipelineStep extends BasePipelineStep {
  /** @pattern "^[a-z0-9-]*$" */
  ifPipelineValue?: string;
}

type PipelineStepInType = 'INLINE_VALUE' | 'PIPELINE_VALUE';

interface PipelineStepInFrom {
  type: PipelineStepInType;
  inFrom: InlineValue | string;
}

interface PipelineStepInTo<T = string> {
  /** @pattern "^[a-z0-9-]*$" */
  inTo: T;
}

export interface InlineValue {
  dataShape: FullDataShape;
  data: any;
}

export interface PipelineStepInFromInlineValue extends PipelineStepInFrom {
  type: 'INLINE_VALUE';
  inFrom: InlineValue;
}

export interface PipelineStepInFromPipelineValue extends PipelineStepInFrom {
  type: 'PIPELINE_VALUE';
  /** @pattern "^[a-z0-9-]*$" */
  inFrom: string;
}

export type PipelineStepInFromInlineValueOrPipelineValue =
  | PipelineStepInFromInlineValue
  | PipelineStepInFromPipelineValue;

export interface PipelineStepOutFrom<T = string> {
  /** @pattern "^[a-z0-9-]*$" */
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
  /** @pattern "^[a-z0-9-]*$" */
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
  in: PipelineStepInFromInlineValueOrPipelineValue & PipelineStepInTo<'delete-table-row-sub-slug'>;
}

type InternalEffectBlockTableUpdateCellOptionIn =
  | PipelineStepInFromInlineValueOrPipelineValue & PipelineStepInTo<'data'>
  | PipelineStepInFromInlineValueOrPipelineValue & PipelineStepInTo<'table-column-sub-slug'>;

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

export interface DrySubYieldPipelineBlockPipelineStep extends IfableBasePipelineStep {
  type: 'DRY_SUB_YIELD_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subYieldPipelineSlug: string;
  in: Array<(PipelineStepInFromInlineValueOrPipelineValue) & PipelineStepInTo>;
  priceOut: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface WetSubYieldPipelineBlockPipelineStep extends IfableBasePipelineStep {
  type: 'WET_SUB_YIELD_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subYieldPipelineSlug: string;
  in: Array<(PipelineStepInFromInlineValueOrPipelineValue) & PipelineStepInTo>;
  priceOut: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface AssertBlockPipelineStep extends BasePipelineStep {
  type: 'ASSERT';
  inFallback: PipelineStepInFromInlineValueOrPipelineValue; //must be non-nullable datashape
  inPriority: PipelineStepInFromPipelineValue[]; // must be nullable datashapes
  out: PipelineStepOutToPipelineValue[];
}
