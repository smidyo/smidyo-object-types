import {
  BasePipelineBody,
  BasePipelineStep,
  PipelineInput,
  PipelineOutput,
  PipelineStepInFromInlineValueOrPipelineValue,
  PipelineStepInTo,
  PipelineStepOutFrom,
  PipelineStepOutToPipelineValue,
  SourceBlock_PipelineStep,
  SubProcessPipeline_PipelineStep,
  SkipUnlessPipelineValues
} from './shared';

export type ElementBlock_FormPipelineStep = ElementBlock_PipelineStep &
  SkipUnlessPipelineValues;
export type SourceBlock_FormPipelineStep = SourceBlock_PipelineStep &
  SkipUnlessPipelineValues;
export type SubFormPipeline_FormPipelineStep = SubFormPipeline_PipelineStep &
  SkipUnlessPipelineValues;
export type SubProcessPipeline_FormPipelineStep = SubProcessPipeline_PipelineStep &
  SkipUnlessPipelineValues;

export type FormPipelineStep =
  | ElementBlock_FormPipelineStep
  | SubFormPipeline_FormPipelineStep
  | SubProcessPipeline_FormPipelineStep
  | SourceBlock_FormPipelineStep;

export interface FormPipelineBody extends BasePipelineBody {
  type: 'FORM';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  steps: FormPipelineStep[];
}

//
//
//

export type SubFormPipeline_PipelineStep_In = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type SubFormPipeline_PipelineStep_Out = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;

/**
 * A form pipeline can have other form pipelines within itself. This is useful for
 * branching paths in the form pipeline. The sub-form-pipeline is not rendered unless
 * all of its inputs are provided.
 */
export interface SubFormPipeline_PipelineStep extends BasePipelineStep {
  type: 'SUB_FORM_PIPELINE';
  subFormPipelineSlug: string;
  in: SubFormPipeline_PipelineStep_In[];
  out: SubFormPipeline_PipelineStep_Out[];
}

export type ElementBlock_PipelineStep_In = PipelineStepInFromInlineValueOrPipelineValue &
  PipelineStepInTo;
export type ElementBlock_PipelineStep_Out = PipelineStepOutFrom &
  PipelineStepOutToPipelineValue;

/**
 * An element block rendered for the user. You can provide a label to describe what
 * the element block step is for.
 */
export interface ElementBlock_PipelineStep extends BasePipelineStep {
  type: 'ELEMENT_BLOCK';
  elementBlockSlug: string;
  label?: string;
  in: ElementBlock_PipelineStep_In[];
  out: ElementBlock_PipelineStep_Out[];
}
