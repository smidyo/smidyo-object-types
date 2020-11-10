import {
  BasePipelineBody,
  PipelineInput,
  PipelineOutput,
  SubProcessPipeline_PipelineStep,
  AssertPipelineStep,
  SkipUnlessPipelineValues,
  OperationBlock_PipelineStep
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
