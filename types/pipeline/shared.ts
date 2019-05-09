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

export interface SkipUnlessPipelineValues {
  skipUnlessPipelineValues?: string[];
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

export type SourceOrEffectBlock_PipelineStep = SourceBlock_PipelineStep | EffectBlock_PipelineStep;

export type SourceBlock_PipelineStep =
  | InternalSourceBlockConstant_PipelineStep
  | InternalSourceBlockTableColumns_PipelineStep
  | InternalSourceBlockTableCells_PipelineStep
  | ExternalSystemSourceBlock_PipelineStep;

export type EffectBlock_PipelineStep =
  | InternalEffectBlockTableDeleteRow_PipelineStep
  | InternalEffectBlockTableUpdateCell_PipelineStep
  | ExternalSystemEffectBlock_PipelineStep;

abstract class ExternalSystemSourceOrEffectBlock_PipelineStep implements BasePipelineStep {
  type: 'EXTERNAL_SYSTEM_SOURCE_BLOCK' | 'EXTERNAL_SYSTEM_EFFECT_BLOCK';
  in: Array<(PipelineStepInFromInlineValueOrPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface ExternalSystemSourceBlock_PipelineStep
  extends ExternalSystemSourceOrEffectBlock_PipelineStep {
  type: 'EXTERNAL_SYSTEM_SOURCE_BLOCK';
  sourceBlock: string;
}

export interface ExternalSystemEffectBlock_PipelineStep
  extends ExternalSystemSourceOrEffectBlock_PipelineStep {
  type: 'EXTERNAL_SYSTEM_EFFECT_BLOCK';
  effectBlock: string;
}

abstract class InternalSourceOrEffectBlock_PipelineStep implements BasePipelineStep {
  type: 'INTERNAL_SOURCE_BLOCK' | 'INTERNAL_EFFECT_BLOCK';
}

//

abstract class InternalSourceBlock_PipelineStep extends InternalSourceOrEffectBlock_PipelineStep {
  type: 'INTERNAL_SOURCE_BLOCK';
  sourceBlock: InternalSourceBlockName;
}

type InternalSourceBlockName = 'CONSTANT' | 'TABLE_COLUMNS' | 'TABLE_CELLS';

export interface InternalSourceBlockConstant_PipelineStep extends InternalSourceBlock_PipelineStep {
  type: 'INTERNAL_SOURCE_BLOCK';

  sourceBlock: 'CONSTANT';
  constantSlug: string;
  out: PipelineStepOutToPipelineValue;
}

export type InternalSourceBlockTableColumns_PipelineStep_Out = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;
export interface InternalSourceBlockTableColumns_PipelineStep
  extends InternalSourceBlock_PipelineStep {
  type: 'INTERNAL_SOURCE_BLOCK';

  sourceBlock: 'TABLE_COLUMNS';
  tableSlug: string;
  singularColumns: string[]; // must be columns of shape singular
  out: InternalSourceBlockTableColumns_PipelineStep_Out[];
}

export type InternalSourceBlockTableCells_PipelineStep_In = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo<'row-name'>;
export type InternalSourceBlockTableCells_PipelineStep_Out = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;
export interface InternalSourceBlockTableCells_PipelineStep
  extends InternalSourceBlock_PipelineStep {
  type: 'INTERNAL_SOURCE_BLOCK';

  sourceBlock: 'TABLE_CELLS';
  tableSlug: string;
  columns: string[];
  in: [InternalSourceBlockTableCells_PipelineStep_In];
  out: InternalSourceBlockTableCells_PipelineStep_Out[];
}

//

type InternalEffectBlockName = 'TABLE_DELETE_ROW' | 'TABLE_UPDATE_CELL';
abstract class InternalEffectBlock_PipelineStep extends InternalSourceOrEffectBlock_PipelineStep {
  type: 'INTERNAL_EFFECT_BLOCK';
  effectBlock: InternalEffectBlockName;
}

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

type InternalEffectBlockTableUpdateCellOptionIn =
  | PipelineStepInFromInlineValueOrPipelineValue & PipelineStepInTo<'data'>
  | PipelineStepInFromInlineValueOrPipelineValue<{
      type: string;
      nullable: false;
      list: false;
    }> &
      PipelineStepInTo<'row-name'>;

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
export interface SubProcessPipeline_PipelineStep extends BasePipelineStep {
  type: 'SUB_PROCESS_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subProcessPipelineSlug: string;
  in: SubProcessPipeline_PipelineStep_In[];
  out: SubProcessPipeline_PipelineStep_Out[];
}

export interface AssertPipelineStep extends BasePipelineStep {
  type: 'ASSERT';
  inPriority: PipelineStepInFromPipelineValue[];
  fallback: AssertPipelineStepRejectFallback | AssertPipelineStepFallbackDataFallback;
  out?: [PipelineStepOutToPipelineValue];
}

abstract class AssertPipelineStepFallback {
  type: 'REJECT' | 'FALLBACK_DATA';
}

export interface AssertPipelineStepRejectFallback extends AssertPipelineStepFallback {
  type: 'REJECT';
  message: PipelineStepInFromInlineValueOrPipelineValue<{
    type: 'text';
    nullable: false;
    list: false;
  }>;
}

export interface AssertPipelineStepFallbackDataFallback extends AssertPipelineStepFallback {
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
