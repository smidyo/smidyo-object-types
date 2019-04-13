import {
  BasePipelineBody,
  PipelineInput,
  PipelineOutput,
  SubProcessPipelineBlockPipelineStep,
  AssertBlockPipelineStep,
  PipelineStepInFromInlineValueOrPipelineValue,
  PipelineStepInTo,
  PipelineStepOutFrom,
  PipelineStepOutToPipelineValue,
  BasePipelineStep
} from './shared';

export interface ProcessPipelineBody extends BasePipelineBody {
  type: 'PROCESS';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  steps: ProcessPipelineStep[];
}

export type ProcessPipelineStep =
  | (OperationBlockPipelineStep | SubProcessPipelineBlockPipelineStep) & {
      skipable?: boolean;
    }
  | AssertBlockPipelineStep;

//
//
//

export type OperationBlockPipelineStepIn = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type OperationBlockPipelineStepOut = PipelineStepOutFrom & PipelineStepOutToPipelineValue;
export interface OperationBlockPipelineStep extends BasePipelineStep {
  type: 'OPERATION';
  operationBlockSlug: string;
  in: OperationBlockPipelineStepIn[];
  out: OperationBlockPipelineStepOut[];
}
