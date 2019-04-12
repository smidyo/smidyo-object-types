import {
  BasePipelineBody,
  SourceBlockPipelineStep,
  PipelineStepInFromInlineValueOrPipelineValue,
  PipelineStepInTo,
  PipelineStepOutFrom,
  PipelineStepOutToPipelineValue,
  IfablePipelineStep,
  BasePipelineStep,
  SubProcessPipelineBlockPipelineStep,
  PipelineInput,
  PipelineOutput
} from './shared';

export interface FormPipelineBody extends BasePipelineBody {
  type: 'FORM';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  steps: Array<
    | ElementBlockPipelineStep
    | SubFormPipelineBlockPipelineStep
    | SubProcessPipelineBlockPipelineStep
    | SourceBlockPipelineStep
  >;
}

//
//
//

export type SubFormPipelineBlockPipelineStepIn = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type SubFormPipelineBlockPipelineStepOut = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;
export interface SubFormPipelineBlockPipelineStep extends IfablePipelineStep {
  type: 'SUB_FORM_PIPELINE';
  subFormPipelineSlug: string;
  in: SubFormPipelineBlockPipelineStepIn[];
  out: SubFormPipelineBlockPipelineStepOut[];
}

export type ElementBlockPipelineStepIn = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type ElementBlockPipelineStepOut = PipelineStepOutFrom & PipelineStepOutToPipelineValue;
export interface ElementBlockPipelineStep extends IfablePipelineStep {
  type: 'ELEMENT';
  elementBlockSlug: string;
  in: ElementBlockPipelineStepIn[];
  out: ElementBlockPipelineStepOut[];
}
