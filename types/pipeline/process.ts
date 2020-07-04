import {
  BasePipelineBody,
  PipelineInput,
  PipelineOutput,
  PipelineStepInFromInlineValueOrPipelineValue,
  PipelineStepInTo,
  PipelineStepOutFrom,
  PipelineStepOutToPipelineValue,
  BasePipelineStep,
  SubProcessPipeline_PipelineStep,
  AssertPipelineStep,
  SkipUnlessPipelineValues
} from './shared';

export type OperationBlock_ProcessPipelineStep = OperationBlock_PipelineStep &
  SkipUnlessPipelineValues;
export type SubProcessPipeline_ProcessPipelineStep = SubProcessPipeline_PipelineStep &
  SkipUnlessPipelineValues;

export type ProcessPipelineStep =
  | OperationBlock_ProcessPipelineStep
  | SubProcessPipeline_ProcessPipelineStep
  | AssertPipelineStep;

export interface ProcessPipelineBody extends BasePipelineBody {
  type: 'PROCESS';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  steps: ProcessPipelineStep[];
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

/**
 * What an operation block outputs if it has a successful outcome
 */
export interface OperationBlockResultOutcome {
  type: 'OPERATION_BLOCK_RESULT_OUTCOME';
  result: Record<string, any[]>;
}

/**
 * What an process pipeline outputs if it has a successful outcome
 */
export interface ProcessPipelineResultOutcome {
  type: 'PROCESS_PIPELINE_RESULT_OUTCOME';
  result: Record<string, any[]>;
}
