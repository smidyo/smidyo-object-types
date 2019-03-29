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
  steps: Array<
    OperationBlockPipelineStep | SubProcessPipelineBlockPipelineStep | AssertBlockPipelineStep
  >;
}

//
//
//

export type OperationBlockPipelineStepIn = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type OperationBlockPipelineStepOut = PipelineStepOutFrom & PipelineStepOutToPipelineValue;
export interface OperationBlockPipelineStep extends BasePipelineStep {
  type: 'OPERATION';
  /** @pattern "^[a-z0-9-]*$" */
  operationBlockSlug: string;
  in: OperationBlockPipelineStepIn[];
  out: OperationBlockPipelineStepOut[];
}
