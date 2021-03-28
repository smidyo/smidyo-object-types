export type BooleanDataType = boolean;

export type NumberDataType = number;

export type TextDataType = string;

export type RichTextDataType = string;

export type FileAnyDataType = {
  file: string;
  originalFilename?: string;
};

export type FileImageDataType = {
  image: string;
  originalFilename?: string;
};

export type FileSVGDataType = {
  svg: string;
  originalFilename?: string;
  unit: 'mm' | 'pt' | 'inches';
};
