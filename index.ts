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
  steps: Array<
    OperationBlockPipelineStep | SubProcessPipelineBlockPipelineStep | AssertBlockPipelineStep
  >;
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
    | AssertBlockPipelineStep
  >;
  wetSteps: Array<
    | EffectBlockPipelineStep
    | SourceBlockPipelineStep
    | SubProcessPipelineBlockPipelineStep
    | WetSubYieldPipelineBlockPipelineStep
    | AssertBlockPipelineStep
  >;
}

export interface YieldPipelinePriceOutput {
  /** @pattern "^[a-z0-9-]*$" */
  name: string;
}

export interface YieldPipelineMetadataOutput {
  /** @pattern "^[a-z0-9-]*$" */
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
  type: BlockType;
}

type IfableBasePipelineStep = BasePipelineStep & {
  /** @pattern "^[a-z0-9-]*$" */
  ifPipelineValue?: string;
};

type PipelineStepInType = 'INLINE_VALUE' | 'PIPELINE_VALUE';

interface PipelineStepInFrom {
  type: PipelineStepInType;
  inFrom: InlineValue | string;
}

interface PipelineStepInTo {
  /** @pattern "^[a-z0-9-]*$" */
  inTo: string;
}

export interface InlineValue {
  dataShape: FullDataShape;
  data: any;
}

export interface PipelineStepInFromInlineValue extends PipelineStepInFrom {
  type: 'INLINE_VALUE';
  inFrom: InlineValue;
}

export interface PipelineStepInFromPipelineValue extends PipelineStepInFrom {
  type: 'PIPELINE_VALUE';
  /** @pattern "^[a-z0-9-]*$" */
  inFrom: string;
}

export interface PipelineStepOutFrom {
  /** @pattern "^[a-z0-9-]*$" */
  outFrom: string;
}

export interface PipelineStepOutToPipelineValue {
  /** @pattern "^[a-z0-9-]*$" */
  outTo: string;
}

export interface SourceBlockPipelineStep extends BasePipelineStep {
  type: 'SOURCE';
  /** @pattern "^[a-z0-9-]*$" */
  sourceBlock: string;
  in: Array<(PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface OperationBlockPipelineStep extends BasePipelineStep {
  type: 'OPERATION';
  /** @pattern "^[a-z0-9-]*$" */
  operationBlock: string;
  in: Array<(PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface ElementBlockPipelineStep extends BasePipelineStep {
  type: 'ELEMENT';
  /** @pattern "^[a-z0-9-]*$" */
  elementBlock: string;
  in: Array<(PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface EffectBlockPipelineStep extends BasePipelineStep {
  type: 'EFFECT';
  /** @pattern "^[a-z0-9-]*$" */
  effectBlock: string;
  in: Array<(PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface SubProcessPipelineBlockPipelineStep extends IfableBasePipelineStep {
  type: 'SUB_PROCESS_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subProcessPipeline: string;
  in: Array<(PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface SubFormPipelineBlockPipelineStep extends IfableBasePipelineStep {
  type: 'SUB_FORM_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subFormPipeline: string;
  in: Array<(PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue) & PipelineStepInTo>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface DrySubYieldPipelineBlockPipelineStep extends IfableBasePipelineStep {
  type: 'DRY_SUB_YIELD_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subYieldPipeline: string;
  in: Array<(PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue) & PipelineStepInTo>;
  priceOut: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface WetSubYieldPipelineBlockPipelineStep extends IfableBasePipelineStep {
  type: 'WET_SUB_YIELD_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subYieldPipeline: string;
  in: Array<(PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue) & PipelineStepInTo>;
  priceOut: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
  out: Array<PipelineStepOutFrom & PipelineStepOutToPipelineValue>;
}

export interface AssertBlockPipelineStep extends BasePipelineStep {
  type: 'ASSERT';
  inFallback: PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue; //must be non-nullable datashape
  inPriority: PipelineStepInFromPipelineValue[]; // must be nullable datashapes
  out: PipelineStepOutToPipelineValue[];
}
