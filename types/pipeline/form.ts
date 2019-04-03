import {
  BasePipelineBody,
  AssertBlockPipelineStep,
  SourceBlockPipelineStep,
  PipelineStepInFromInlineValueOrPipelineValue,
  PipelineStepInTo,
  PipelineStepOutFrom,
  PipelineStepOutToPipelineValue,
  IfableBasePipelineStep,
  BasePipelineStep
} from './shared';

export interface FormPipelineBody extends BasePipelineBody {
  type: 'FORM';
  steps: Array<
    | ElementBlockPipelineStep
    | SubFormPipelineBlockPipelineStep
    | SourceBlockPipelineStep
    | AssertBlockPipelineStep
  >;
}

//
//
//

export type SubFormPipelineBlockPipelineStepIn = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type SubFormPipelineBlockPipelineStepOut = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;
export interface SubFormPipelineBlockPipelineStep extends IfableBasePipelineStep {
  type: 'SUB_FORM_PIPELINE';
  subFormPipelineSlug: string;
  in: SubFormPipelineBlockPipelineStepIn[];
  out: SubFormPipelineBlockPipelineStepIn[];
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
