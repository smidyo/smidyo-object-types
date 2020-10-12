import { PartialDataShape, FullDataShape } from '../data-shape';
import { InlineValue } from '../inline-value';

interface ElementBlockInput {
  type: 'STANDARD' | 'FOLLOWER';
  name: string;
  title: string;
  defaultInlineValue?: InlineValue;
}

export interface ElementBlockStandardInput extends ElementBlockInput {
  type: 'STANDARD';
  limitToTextOptions?: string[];
  dataShapeConstraint: PartialDataShape;
}

export interface ElementBlockFollowerInput extends ElementBlockInput {
  type: 'FOLLOWER';
  followInput: string;
  dataShapeConstraint: PartialDataShape;
}

interface ElementBlockOutput {
  type: 'STANDARD' | 'FOLLOWER';
  name: string;
  title: string;
}

export interface ElementBlockStandardOutput extends ElementBlockOutput {
  type: 'STANDARD';
  dataShape: FullDataShape;
}

export interface ElementBlockFollowerOutput extends ElementBlockOutput {
  type: 'FOLLOWER';
  followInput: string;
  dataShapeConstraint: PartialDataShape;
}

export interface ElementBlockBody {
  inputs: (ElementBlockStandardInput | ElementBlockFollowerInput)[];
  outputs: (ElementBlockStandardOutput | ElementBlockFollowerOutput)[];
}
