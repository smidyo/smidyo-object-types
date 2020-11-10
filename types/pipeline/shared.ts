import { FullDataShape } from '../data-shape';
import { InlineValue } from '../inline-value';

export type PipelineType = 'PROCESS' | 'FORM' | 'YIELD';

export interface BasePipelineBody {
  type: PipelineType;
}

/**
 * Defines a pipeline input
 */
export interface PipelineInput {
  /** @pattern "^[a-z0-9-]*$" */
  name: string;
  dataShape: FullDataShape;
}

/**
 * Defines a pipeline output
 */
export interface PipelineOutput {
  /** @pattern "^[a-z0-9-]*$" */
  name: string;
  dataShape: FullDataShape;
}

type StepType =
  | 'OPERATION_BLOCK'
  | 'ELEMENT_BLOCK'
  | 'EXTERNAL_SYSTEM_SOURCE_BLOCK'
  | 'INTERNAL_SOURCE_BLOCK'
  | 'EXTERNAL_SYSTEM_EFFECT_BLOCK'
  | 'INTERNAL_EFFECT_BLOCK'
  | 'SUB_PROCESS_PIPELINE'
  | 'SUB_FORM_PIPELINE'
  | 'QUOTING_SUB_YIELD_PIPELINE'
  | 'ORDERING_SUB_YIELD_PIPELINE'
  | 'ASSERT';

export interface BasePipelineStep {
  type: StepType;
}

/**
 * If this property is defined, the pipeline step will be skipped unless
 * the following pipeline values are set, and not set to null.
 */
export interface SkipUnlessPipelineValues {
  skipUnlessPipelineValues?: string[];
}

/**
 * A pipeline step can get its payload from either an inline value or a
 * pipeline value.
 */
abstract class PipelineStepInFrom<DS = FullDataShape> {
  type: 'INLINE_VALUE' | 'PIPELINE_VALUE';
  inFrom: InlineValue<DS> | string;
}

export interface PipelineStepInTo<T = string> {
  inTo: T;
}

export interface PipelineStepInFromInlineValue<DS = FullDataShape>
  extends PipelineStepInFrom<DS> {
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

export type OperationBlock_PipelineStep_In = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type OperationBlock_PipelineStep_Out = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;
export interface OperationBlock_PipelineStep extends BasePipelineStep {
  type: 'OPERATION_BLOCK';
  operationBlockSlug: string;
  in: OperationBlock_PipelineStep_In[];
  out: OperationBlock_PipelineStep_Out[];
}

//
//
//

export type SourceOrEffectBlock_PipelineStep =
  | SourceBlock_PipelineStep
  | EffectBlock_PipelineStep;

/**
 * External systems are not yet implemented, this may change
 */
export type SourceBlock_PipelineStep =
  | InternalSourceBlockConstant_PipelineStep
  | InternalSourceBlockTableColumns_PipelineStep
  | InternalSourceBlockTableCells_PipelineStep
  | InternalSourceBlockTableCell_PipelineStep
  | ExternalSystemSourceBlock_PipelineStep;

/**
 * Effect blocks are not yet implemented, these may change
 */
export type EffectBlock_PipelineStep =
  | InternalEffectBlockTableDeleteRow_PipelineStep
  | InternalEffectBlockTableUpdateCell_PipelineStep
  | ExternalSystemEffectBlock_PipelineStep;

/**
 * External systems are not yet implemented, this may change
 */
abstract class ExternalSystemSourceOrEffectBlock_PipelineStep
  implements BasePipelineStep {
  type: 'EXTERNAL_SYSTEM_SOURCE_BLOCK' | 'EXTERNAL_SYSTEM_EFFECT_BLOCK';
  in: Array<PipelineStepInFromInlineValueOrPipelineValue & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

/**
 * External systems are not yet implemented, this may change
 */
export interface ExternalSystemSourceBlock_PipelineStep
  extends ExternalSystemSourceOrEffectBlock_PipelineStep {
  type: 'EXTERNAL_SYSTEM_SOURCE_BLOCK';
  sourceBlock: string;
}

/**
 * External systems are not yet implemented, this may change
 */
export interface ExternalSystemEffectBlock_PipelineStep
  extends ExternalSystemSourceOrEffectBlock_PipelineStep {
  type: 'EXTERNAL_SYSTEM_EFFECT_BLOCK';
  effectBlock: string;
}

/**
 * Effect blocks are not yet implemented, these may change
 */
abstract class InternalSourceOrEffectBlock_PipelineStep implements BasePipelineStep {
  type: 'INTERNAL_SOURCE_BLOCK' | 'INTERNAL_EFFECT_BLOCK';
}

//

abstract class InternalSourceBlock_PipelineStep extends InternalSourceOrEffectBlock_PipelineStep {
  type: 'INTERNAL_SOURCE_BLOCK';
  sourceBlock: InternalSourceBlockName;
}

type InternalSourceBlockName =
  | 'CONSTANT'
  | 'TABLE_COLUMNS'
  | 'TABLE_CELLS'
  | 'TABLE_CELL';

/**
 * Gets a constant
 */
export type InternalSourceBlockConstant_PipelineStep_Out = PipelineStepOutFrom<
  'constant'
> &
  PipelineStepOutToPipelineValue;
export interface InternalSourceBlockConstant_PipelineStep
  extends InternalSourceBlock_PipelineStep {
  type: 'INTERNAL_SOURCE_BLOCK';

  sourceBlock: 'CONSTANT';
  constantSlug: string;
  out: [InternalSourceBlockConstant_PipelineStep_Out];
}

/**
 * Gets an entire table column. The columns are outputted as a list, therefore the column
 * type must be of a singular type.
 */
export type InternalSourceBlockTableColumns_PipelineStep_Out = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;
export interface InternalSourceBlockTableColumns_PipelineStep
  extends InternalSourceBlock_PipelineStep {
  type: 'INTERNAL_SOURCE_BLOCK';

  sourceBlock: 'TABLE_COLUMNS';
  tableSlug: string;
  out: InternalSourceBlockTableColumns_PipelineStep_Out[];
}

/**
 * Gets cells from a specific row
 */
export type InternalSourceBlockTableCells_PipelineStep_In = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo<'row-name'>;
export type InternalSourceBlockTableCells_PipelineStep_Out = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;
export interface InternalSourceBlockTableCells_PipelineStep
  extends InternalSourceBlock_PipelineStep {
  type: 'INTERNAL_SOURCE_BLOCK';

  sourceBlock: 'TABLE_CELLS';
  tableSlug: string;
  in: [InternalSourceBlockTableCells_PipelineStep_In];
  out: InternalSourceBlockTableCells_PipelineStep_Out[];
}

/**
 * Gets one cell
 */
export type InternalSourceBlockTableCell_PipelineStep_In<
  T
> = PipelineStepInFromInlineValueOrPipelineValue & PipelineStepInTo<T>;
export type InternalSourceBlockTableCell_PipelineStep_Out = PipelineStepOutFrom<'cell'> &
  PipelineStepOutToPipelineValue;
export interface InternalSourceBlockTableCell_PipelineStep
  extends InternalSourceBlock_PipelineStep {
  type: 'INTERNAL_SOURCE_BLOCK';

  sourceBlock: 'TABLE_CELL';
  tableSlug: string;
  in:
    | [
        InternalSourceBlockTableCell_PipelineStep_In<'row-name'>,
        InternalSourceBlockTableCell_PipelineStep_In<'column-name'>
      ]
    | [
        InternalSourceBlockTableCell_PipelineStep_In<'column-name'>,
        InternalSourceBlockTableCell_PipelineStep_In<'row-name'>
      ];
  out: [InternalSourceBlockTableCell_PipelineStep_Out];
}

//

/**
 * Not yet implemented
 */
type InternalEffectBlockName = 'TABLE_DELETE_ROW' | 'TABLE_UPDATE_CELL';
abstract class InternalEffectBlock_PipelineStep extends InternalSourceOrEffectBlock_PipelineStep {
  type: 'INTERNAL_EFFECT_BLOCK';
  effectBlock: InternalEffectBlockName;
}

/**
 * Not yet implemented
 */
export type InternalEffectBlockTableDeleteRow_PipelineStep_In = PipelineStepInFromInlineValueOrPipelineValue<{
  type: string;
  nullable: false;
  list: false;
}> &
  PipelineStepInTo<'row-name'>;
export interface InternalEffectBlockTableDeleteRow_PipelineStep
  extends InternalEffectBlock_PipelineStep {
  type: 'INTERNAL_EFFECT_BLOCK';

  effectBlock: 'TABLE_DELETE_ROW';
  tableSlug: string;
  in: [InternalEffectBlockTableDeleteRow_PipelineStep_In];
}

/**
 * Not yet implemented
 */
type InternalEffectBlockTableUpdateCellOptionIn =
  | (PipelineStepInFromInlineValueOrPipelineValue & PipelineStepInTo<'data'>)
  | (PipelineStepInFromInlineValueOrPipelineValue<{
      type: string;
      nullable: false;
      list: false;
    }> &
      PipelineStepInTo<'row-name'>);

/**
 * Not yet implemented
 */
export interface InternalEffectBlockTableUpdateCell_PipelineStep
  extends InternalEffectBlock_PipelineStep {
  type: 'INTERNAL_EFFECT_BLOCK';

  effectBlock: 'TABLE_UPDATE_CELL';
  tableSlug: string;
  column: string;
  in: InternalEffectBlockTableUpdateCellOptionIn[];
}

export type SubProcessPipeline_PipelineStep_In = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type SubProcessPipeline_PipelineStep_Out = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;

/**
 * Runs another process pipeline
 */
export interface SubProcessPipeline_PipelineStep extends BasePipelineStep {
  type: 'SUB_PROCESS_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subProcessPipelineSlug: string;
  in: SubProcessPipeline_PipelineStep_In[];
  out: SubProcessPipeline_PipelineStep_Out[];
}

/**
 * Asserts that a pipeline is not null. Values are asserted in the order that
 * inPriority is defined. If none of values in inPriority are non-null, the fallback
 * is used.
 *
 * The asserted value (which is now surely not null), can also be used from out.
 */
export interface AssertPipelineStep extends BasePipelineStep {
  type: 'ASSERT';
  inPriority: PipelineStepInFromPipelineValue[];
  fallback: AssertPipelineStepRejectFallback | AssertPipelineStepFallbackDataFallback;
  out?: [PipelineStepOutToPipelineValue];
}

abstract class AssertPipelineStepFallback {
  type: 'REJECT' | 'FALLBACK_DATA';
}

/**
 * Rejects the pipeline. You can specify the message from an inline value or make
 * it dynamic from a pipeline value.
 */
export interface AssertPipelineStepRejectFallback extends AssertPipelineStepFallback {
  type: 'REJECT';
  message: PipelineStepInFromInlineValueOrPipelineValue<{
    type: 'text';
    nullable: false;
    list: false;
  }>;
}

/**
 * A fallback value to use. The data's data shape can not be nullable.
 */
export interface AssertPipelineStepFallbackDataFallback
  extends AssertPipelineStepFallback {
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

/**
 * What a pipeline outputs in case of a rejection outcome. Same as RejectionOutcome
 * except it has location information.
 */
export interface PipelineRejectionOutcome {
  type: 'PIPELINE_REJECTION_OUTCOME';
  location: string;
  rejection: string;
}

/**
 * A general rejection outcome
 */
export interface RejectionOutcome {
  type: 'REJECTION_OUTCOME';
  rejection: string;
}

/**
 * What a pipeline outputs in case of an error outcome. Same as ErrorOutcome
 * except it has location information.
 */
export interface PipelineErrorOutcome {
  type: 'PIPELINE_ERROR_OUTCOME';
  location: string;
  error: string;
}

/**
 * General error outcome
 */
export interface ErrorOutcome {
  type: 'ERROR_OUTCOME';
  error: string;
}
