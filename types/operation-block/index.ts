import { PartialDataShape, FullDataShape } from '../data-shape';
import { InlineValue } from '../inline-value';

export interface OperationBlockInput {
  type: 'STANDARD' | 'FOLLOWER';
  name: string;
  title: string;
  defaultInlineValue?: InlineValue;
}

export interface OperationBlockStandardInput extends OperationBlockInput {
  type: 'STANDARD';
  limitToTextOptions?: string[];
  dataShapeConstraint: PartialDataShape;
}

export interface OperationBlockFollowerInput extends OperationBlockInput {
  type: 'FOLLOWER';
  followInput: string;
  dataShapeConstraint: PartialDataShape;
}

export interface OperationBlockOutput {
  type: 'STANDARD' | 'FOLLOWER';
  name: string;
  title: string;
}

export interface OperationBlockStandardOutput extends OperationBlockOutput {
  type: 'STANDARD';
  dataShape: FullDataShape;
}

export interface OperationBlockFollowerOutput extends OperationBlockInput {
  type: 'FOLLOWER';
  followInput: string;
  dataShapeConstraint: PartialDataShape;
}

export interface OperationBlockBody {
  inputs: (OperationBlockStandardInput | OperationBlockFollowerInput)[];
  outputs: (OperationBlockStandardOutput | OperationBlockFollowerOutput)[];
}
