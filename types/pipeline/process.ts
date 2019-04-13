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
  BasePipelineStep,
  SkipablePipelineStep
} from './shared';

export type OperationBlockProcessPipelineStep = OperationBlockPipelineStep &
  SkipablePipelineStep;
export type SubProcessPipelineBlockProcessPipelineStep = SubProcessPipelineBlockPipelineStep &
  SkipablePipelineStep;

export type ProcessPipelineStep =
  | OperationBlockProcessPipelineStep
  | SubProcessPipelineBlockProcessPipelineStep
  | AssertBlockPipelineStep;

export interface ProcessPipelineBody extends BasePipelineBody {
  type: 'PROCESS';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  steps: ProcessPipelineStep[];
}

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
