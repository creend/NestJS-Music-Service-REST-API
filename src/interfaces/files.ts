export interface MulterDiskUploadedFiles {
  [fieldname: string]:
    | {
        filename: string;
        size: number;
        mimetype: string;
        originalName: string;
        fieldname: string;
        encoding: string;
      }[]
    | undefined;
}
