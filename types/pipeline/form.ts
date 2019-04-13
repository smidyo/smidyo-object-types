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

// All FP steps are skipable per default

export interface SkipUnlessPipelineValuesPipelineStep {
  skipUnlessPipelineValues?: string[];
}

export type ElementBlockFormPipelineStep = ElementBlockPipelineStep &
  SkipUnlessPipelineValuesPipelineStep;
export type SubFormPipelineBlockFormPipelineStep = SubFormPipelineBlockPipelineStep &
  SkipUnlessPipelineValuesPipelineStep;
export type SubProcessPipelineBlockFormPipelineStep = SubProcessPipelineBlockPipelineStep &
  SkipUnlessPipelineValuesPipelineStep;
export type SourceBlockFormPipelineStep = SourceBlockPipelineStep &
  SkipUnlessPipelineValuesPipelineStep;

export type FormPipelineStep =
  | ElementBlockFormPipelineStep
  | SubFormPipelineBlockFormPipelineStep
  | SubProcessPipelineBlockFormPipelineStep
  | SourceBlockFormPipelineStep;

export interface FormPipelineBody extends BasePipelineBody {
  type: 'FORM';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  steps: FormPipelineStep[];
}

//
//
//

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
