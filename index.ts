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
  name: string;
  dataShape: FullDataShape;
}

export interface PipelineOutput {
  name: string;
  dataShape: FullDataShape;
}

export interface BasePipeline {
  type: PipelineType;
  steps: BasePipelineStep[];
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
  steps: Array<
    | SubProcessPipelineBlockPipelineStep
    | SubYieldPipelineBlockPipelineStep
    | SourceBlockPipelineStep
    | PriceBlockPipelineStep
  >;
  postSteps: Array<
    | EffectBlockPipelineStep
    | SubProcessPipelineBlockPipelineStep
    | SubYieldPipelineBlockPipelineStep
    | SourceBlockPipelineStep
    | MetaDataBlockPipelineStep
  >;
}

type BlockType =
  | 'SOURCE'
  | 'OPERATION'
  | 'ELEMENT'
  | 'EFFECT'
  | 'METADATA'
  | 'PRICE'
  | 'SUB_PROCESS_PIPELINE'
  | 'SUB_FORM_PIPELINE'
  | 'SUB_YIELD_PIPELINE'
  | 'ASSERT';

export interface BasePipelineStep {
  block: BlockType;
}

type IfableBasePipelineStep = BasePipelineStep & {
  ifPipelineValue?: string;
};

export type PipelineStepIn = PipelineStepInFromPipelineValue | PipelineStepInFromStatic;

export interface PipelineStepInFromStatic {
  fromStaticValue: any;
  toStepInput: string;
}

export interface PipelineStepInFromPipelineValue {
  fromPipelineValue: string;
  toStepInput: string;
}

export type PipelineStepOut = PipelineStepOutToPipelineValue;

export interface PipelineStepOutToPipelineValue {
  fromStepOutput: string;
  toPipelineValue: string;
}

export interface SourceBlockPipelineStep extends BasePipelineStep {
  block: 'SOURCE';
  sourceBlock: string;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface OperationBlockPipelineStep extends BasePipelineStep {
  block: 'OPERATION';
  operationBlock: string;
  version: number;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface ElementBlockPipelineStep extends BasePipelineStep {
  block: 'ELEMENT';
  elementBlock: string;
  version: number;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface EffectBlockPipelineStep extends BasePipelineStep {
  block: 'EFFECT';
  effectBlock: string;
  version: number;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface MetaDataBlockPipelineStep extends BasePipelineStep {
  block: 'METADATA';
  in: PipelineStepIn;
}

export interface PriceBlockPipelineStep extends BasePipelineStep {
  block: 'PRICE';
  in: PipelineStepIn;
}

export interface SubProcessPipelineBlockPipelineStep extends IfableBasePipelineStep {
  block: 'SUB_PROCESS_PIPELINE';
  subProcessPipeline: string;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface SubFormPipelineBlockPipelineStep extends IfableBasePipelineStep {
  block: 'SUB_FORM_PIPELINE';
  subFormPipeline: string;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface SubYieldPipelineBlockPipelineStep extends IfableBasePipelineStep {
  block: 'SUB_YIELD_PIPELINE';
  subYieldPipeline: string;
  in: PipelineStepIn[];
  out: PipelineStepOut[];
}

export interface AssertBlockPipelineStep extends BasePipelineStep {
  block: 'ASSERT';
  in: PipelineStepIn[];
  out: PipelineStepOut;
  errorMessage: string;
}

const test: YieldPipeline = {
  type: 'YIELD',
  inputs: [
    {
      name: 'a',
      dataShape: {
        type: 'number',
        nullable: false,
        list: false
      }
    }
  ],
  steps: [
    {
      block: 'SUB_PROCESS_PIPELINE',
      processPipeline: 'math-basic',
      in: [
        {
          fromPipelineValue: 'a',
          toStepInput: 'a'
        }
      ],
      out: [
        {
          fromStepOutput: 'b',
          toPipelineValue: 'b'
        }
      ]
    }
  ],
  postSteps: []
};
