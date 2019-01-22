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
  blockType: BlockType;
}

type IfableBasePipelineStep = BasePipelineStep & {
  /** @pattern "^[a-z0-9-]*$" */
  ifPipelineValue?: string;
};

type PipelineStepInType = 'INLINE_VALUE' | 'PIPELINE_VALUE';

interface BasePipelineStepIn {
  inType: PipelineStepInType;
  /** @pattern "^[a-z0-9-]*$" */
  toStepInput: string;
}

export interface InlineValue {
  dataShape: FullDataShape;
  data: any;
}

export interface PipelineStepInFromInlineValue extends BasePipelineStepIn {
  inType: 'INLINE_VALUE';
  fromInlineValue: InlineValue;
}

export interface PipelineStepInFromPipelineValue extends BasePipelineStepIn {
  inType: 'PIPELINE_VALUE';
  /** @pattern "^[a-z0-9-]*$" */
  fromPipelineValue: string;
}

export interface PipelineStepOutToPipelineValue {
  /** @pattern "^[a-z0-9-]*$" */
  fromStepOutput: string;
  /** @pattern "^[a-z0-9-]*$" */
  toPipelineValue: string;
}

export interface SourceBlockPipelineStep extends BasePipelineStep {
  blockType: 'SOURCE';
  /** @pattern "^[a-z0-9-]*$" */
  sourceBlock: string;
  in: Array<PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue>;
  out: PipelineStepOutToPipelineValue[];
}

export interface OperationBlockPipelineStep extends BasePipelineStep {
  blockType: 'OPERATION';
  /** @pattern "^[a-z0-9-]*$" */
  operationBlock: string;
  in: Array<PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue>;
  out: PipelineStepOutToPipelineValue[];
}

export interface ElementBlockPipelineStep extends BasePipelineStep {
  blockType: 'ELEMENT';
  /** @pattern "^[a-z0-9-]*$" */
  elementBlock: string;
  in: Array<PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue>;
  out: PipelineStepOutToPipelineValue[];
}

export interface EffectBlockPipelineStep extends BasePipelineStep {
  blockType: 'EFFECT';
  /** @pattern "^[a-z0-9-]*$" */
  effectBlock: string;
  in: Array<PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue>;
  out: PipelineStepOutToPipelineValue[];
}

export interface SubProcessPipelineBlockPipelineStep extends IfableBasePipelineStep {
  blockType: 'SUB_PROCESS_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subProcessPipeline: string;
  in: Array<PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue>;
  out: PipelineStepOutToPipelineValue[];
}

export interface SubFormPipelineBlockPipelineStep extends IfableBasePipelineStep {
  blockType: 'SUB_FORM_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subFormPipeline: string;
  in: Array<PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue>;
  out: PipelineStepOutToPipelineValue[];
}

export interface DrySubYieldPipelineBlockPipelineStep extends IfableBasePipelineStep {
  blockType: 'DRY_SUB_YIELD_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subYieldPipeline: string;
  in: Array<PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue>;
  priceOut: PipelineStepOutToPipelineValue[];
}

export interface WetSubYieldPipelineBlockPipelineStep extends IfableBasePipelineStep {
  blockType: 'WET_SUB_YIELD_PIPELINE';
  /** @pattern "^[a-z0-9-.]*$" */
  subYieldPipeline: string;
  in: Array<PipelineStepInFromInlineValue | PipelineStepInFromPipelineValue>;
  priceOut: PipelineStepOutToPipelineValue[];
  out: PipelineStepOutToPipelineValue[];
}

export interface AssertBlockPipelineStep extends BasePipelineStep {
  blockType: 'ASSERT';
  inFallback: InlineValue | string; //must be non-nullable datashape
  inPriority: string[]; // must be nullable datashapes
  out: string[];
}
