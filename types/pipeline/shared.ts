import { FullDataShape } from '../data-shape';

export type PipelineType = 'PROCESS' | 'FORM' | 'YIELD';

export interface BasePipelineBody {
  type: PipelineType;
}

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

export interface BasePipelineStep {
  type: BlockType;
}

export interface SkipablePipelineStep {
  skippable?: boolean;
}

abstract class PipelineStepInFrom<DS = FullDataShape> {
  type: 'INLINE_VALUE' | 'PIPELINE_VALUE';
  inFrom: InlineValue<DS> | string;
}

export interface PipelineStepInTo<T = string> {
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

abstract class ExternalSystemSourceOrEffectBlockPipelineStep implements BasePipelineStep {
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

abstract class InternalSourceOrEffectBlockPipelineStep implements BasePipelineStep {
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

export type InternalSourceBlockTableColumnsOut = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;
export interface InternalSourceBlockTableColumns extends InternalSourceBlockPipelineStep {
  type: 'INTERNAL_SOURCE';

  sourceBlock: 'TABLE_COLUMNS';
  tableSlug: string;
  columns: string[];
  out: InternalSourceBlockTableColumnsOut[];
}

export type InternalSourceBlockTableCellsIn = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo<'row-name'>;
export type InternalSourceBlockTableCellsOut = PipelineStepOutFrom & PipelineStepOutToPipelineValue;
export interface InternalSourceBlockTableCells extends InternalSourceBlockPipelineStep {
  type: 'INTERNAL_SOURCE';

  sourceBlock: 'TABLE_CELLS';
  tableSlug: string;
  singularColumns: string[]; // must be columns of shape singular
  in: InternalSourceBlockTableCellsIn;
  out: InternalSourceBlockTableCellsOut[];
}

//

abstract class InternalEffectBlockPipelineStep extends InternalSourceOrEffectBlockPipelineStep {
  type: 'INTERNAL_EFFECT';
  effectBlock: InternalEffectBlockName;
}

type InternalEffectBlockName = 'TABLE_DELETE_ROW' | 'TABLE_UPDATE_CELL';

export type InternalEffectBlockTableDeleteRowIn = PipelineStepInFromInlineValueOrPipelineValue<{
  type: string;
  nullable: false;
  list: false;
}> &
  PipelineStepInTo<'row-name'>;
export interface InternalEffectBlockTableDeleteRow extends InternalEffectBlockPipelineStep {
  type: 'INTERNAL_EFFECT';

  effectBlock: 'TABLE_DELETE_ROW';
  tableSlug: string;
  in: InternalEffectBlockTableDeleteRowIn;
}

type InternalEffectBlockTableUpdateCellOptionIn =
  | PipelineStepInFromInlineValueOrPipelineValue & PipelineStepInTo<'data'>
  | PipelineStepInFromInlineValueOrPipelineValue<{
      type: string;
      nullable: false;
      list: false;
    }> &
      PipelineStepInTo<'row-name'>;

export interface InternalEffectBlockTableUpdateCell extends InternalEffectBlockPipelineStep {
  type: 'INTERNAL_EFFECT';

  effectBlock: 'TABLE_UPDATE_CELL';
  tableSlug: string;
  column: string;
  in: InternalEffectBlockTableUpdateCellOptionIn[];
}

export type SubProcessPipelineBlockPipelineStepIn = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type SubProcessPipelineBlockPipelineStepOut = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;
export interface SubProcessPipelineBlockPipelineStep extends BasePipelineStep {
  type: 'SUB_PROCESS_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subProcessPipelineSlug: string;
  in: SubProcessPipelineBlockPipelineStepIn[];
  out: SubProcessPipelineBlockPipelineStepOut[];
}

export interface AssertBlockPipelineStep extends BasePipelineStep {
  type: 'ASSERT';
  inPriority: PipelineStepInFromPipelineValue[];
  fallback: AssertBlockPipelineStepRejectFallback | AssertBlockPipelineStepFallbackDataFallback;
  out?: PipelineStepOutToPipelineValue;
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

export interface PipelineRejectionResult {
  type: 'REJECTION_RESULT';
  message: string;
}

//
//
//
