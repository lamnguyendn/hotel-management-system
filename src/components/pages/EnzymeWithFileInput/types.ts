export type FileChooserProps = {
  fileName?: string;
  changeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
