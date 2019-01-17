export interface FullDataShape {
  type: string;
  nullable: boolean;
  list: boolean;
}

export interface PartialDataShape {
  type?: string;
  nullable?: boolean;
  list?: boolean;
}

export type PipelineType = 'PROCESS' | 'FORM' | 'YIELD';

export interface PipelineInput {
  /** @pattern "^[a-z0-9-]*$" */
  name: string;
  dataShape: FullDataShape;
}

export interface PipelineOutput {
  /** @pattern "^[a-z0-9-]*$" */
  name: string;
  dataShape: FullDataShape;
}

export interface BasePipeline {
  type: PipelineType;
}

export interface ProcessPipeline extends BasePipeline {
  type: 'PROCESS';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  steps: Array<OperationBlockPipelineStep | SubProcessPipelineBlockPipelineStep>;
}

export interface FormPipeline extends BasePipeline {
  type: 'FORM';
  steps: Array<
    | ElementBlockPipelineStep
    | SubFormPipelineBlockPipelineStep
    | SourceBlockPipelineStep
    | AssertBlockPipelineStep
  >;
}

export interface YieldPipeline extends BasePipeline {
  type: 'YIELD';
  inputs: PipelineInput[];
  outputs: PipelineOutput[];
  priceOutputs: YieldPipelinePriceOutput[];
  metadataOutputs: YieldPipelineMetadataOutput[];
  drySteps: Array<
    | SubProcessPipelineBlockPipelineStep
    | DrySubYieldPipelineBlockPipelineStep
    | SourceBlockPipelineStep
  >;
  wetSteps: Array<
    | EffectBlockPipelineStep
    | SourceBlockPipelineStep
    | SubProcessPipelineBlockPipelineStep
    | WetSubYieldPipelineBlockPipelineStep
  >;
}

export interface YieldPipelinePriceOutput {
  name: string;
}

export interface YieldPipelineMetadataOutput {
  name: string;
}

type BlockType =
  | 'SOURCE'
  | 'OPERATION'
  | 'ELEMENT'
  | 'EFFECT'
  | 'SUB_PROCESS_PIPELINE'
  | 'SUB_FORM_PIPELINE'
  | 'DRY_SUB_YIELD_PIPELINE'
  | 'WET_SUB_YIELD_PIPELINE'
  | 'ASSERT';

export interface BasePipelineStep {
  block: BlockType;
}

type IfableBasePipelineStep = BasePipelineStep & {
  /** @pattern "^[a-z0-9-]*$" */
  ifPipelineValue?: string;
};

export type PipelineStepIn = PipelineStepInFromPipelineValue | PipelineStepInFromStatic;

export interface PipelineStepInFromStatic {
  fromStaticValue: any;
  /** @pattern "^[a-z0-9-]*$" */
  toStepInput: string;
}

export interface PipelineStepInFromPipelineValue {
  /** @pattern "^[a-z0-9-]*$" */
  fromPipelineValue: string;
  /** @pattern "^[a-z0-9-]*$" */
  toStepInput: string;
}

export type PipelineStepOut = PipelineStepOutToPipelineValue;

export interface PipelineStepOutToPipelineValue {
  /** @pattern "^[a-z0-9-]*$" */
  fromStepOutput: string;
  /** @pattern "^[a-z0-9-]*$" */
  toPipelineValue: string;
}

export interface SourceBlockPipelineStep extends BasePipelineStep {
  block: 'SOURCE';
  /** @pattern "^[a-z0-9-]*$" */
  sourceBlock: string;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface OperationBlockPipelineStep extends BasePipelineStep {
  block: 'OPERATION';
  /** @pattern "^[a-z0-9-]*$" */
  operationBlock: string;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface ElementBlockPipelineStep extends BasePipelineStep {
  block: 'ELEMENT';
  /** @pattern "^[a-z0-9-]*$" */
  elementBlock: string;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface EffectBlockPipelineStep extends BasePipelineStep {
  block: 'EFFECT';
  /** @pattern "^[a-z0-9-]*$" */
  effectBlock: string;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface SubProcessPipelineBlockPipelineStep extends IfableBasePipelineStep {
  block: 'SUB_PROCESS_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subProcessPipeline: string;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface SubFormPipelineBlockPipelineStep extends IfableBasePipelineStep {
  block: 'SUB_FORM_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subFormPipeline: string;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface DrySubYieldPipelineBlockPipelineStep extends IfableBasePipelineStep {
  block: 'DRY_SUB_YIELD_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subYieldPipeline: string;
  in: PipelineStepIn[];
  priceOut: PipelineStepOut[];
}

export interface WetSubYieldPipelineBlockPipelineStep extends IfableBasePipelineStep {
  block: 'WET_SUB_YIELD_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subYieldPipeline: string;
  in: PipelineStepIn[];
  priceOut: PipelineStepOut[];
  out: PipelineStepOut[];
}

export interface AssertBlockPipelineStep extends BasePipelineStep {
  block: 'ASSERT';
  in: PipelineStepIn[];
  out: PipelineStepOut;
  errorMessage: string;
}
