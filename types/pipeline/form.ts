import {
  BasePipelineBody,
  SourceBlockPipelineStep,
  PipelineStepInFromInlineValueOrPipelineValue,
  PipelineStepInTo,
  PipelineStepOutFrom,
  PipelineStepOutToPipelineValue,
  BasePipelineStep,
  SubProcessPipelineBlockPipelineStep,
  PipelineInput,
  PipelineOutput
} from './shared';

export interface FormPipelineBody extends BasePipelineBody {
  type: 'FORM';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  steps: Array<FormPipelineStep>;
}

//
//
//

// All FP steps are conditional per standard

export type FormPipelineStep = (
  | ElementBlockPipelineStep
  | SubFormPipelineBlockPipelineStep
  | SubProcessPipelineBlockPipelineStep
  | SourceBlockPipelineStep) & {
  skipUnlessPipelineValues?: string[];
};

export type SubFormPipelineBlockPipelineStepIn = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type SubFormPipelineBlockPipelineStepOut = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;
export interface SubFormPipelineBlockPipelineStep extends BasePipelineStep {
  type: 'SUB_FORM_PIPELINE';
  subFormPipelineSlug: string;
  in: SubFormPipelineBlockPipelineStepIn[];
  out: SubFormPipelineBlockPipelineStepOut[];
}

export type ElementBlockPipelineStepIn = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type ElementBlockPipelineStepOut = PipelineStepOutFrom & PipelineStepOutToPipelineValue;
export interface ElementBlockPipelineStep extends BasePipelineStep {
  type: 'ELEMENT';
  elementBlockSlug: string;
  in: ElementBlockPipelineStepIn[];
  out: ElementBlockPipelineStepOut[];
}
