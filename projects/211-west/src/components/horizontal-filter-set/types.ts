export type HorizontalFilterSetInputType =
  | 'multi-option'
  | 'divider'
  | 'button'
  | 'menu'
  | 'slider'
  | 'label'
  | 'text-field'
  | 'text-field-with-icon'
  | 'custom';

export type HorizontalFilterSetCustomInput = {
  id: string;
  label: string;
  Component: React.FC<
    HorizontalFilterSetInputProps<{
      id: string;
      options?: { label?: string; value: string | number }[];
    }>
  >;
  options?: { label?: string; value: string | number }[];
};

export type HorizontalFilterSetMultiOptionInput = {
  id: string;
  label: string;
  options: { label?: string; value: string | number }[];
  variant?: 'default' | 'dark';
  className?: string;
};

export type HorizontalFilterSetButtonInput = {
  id: string;
  label: string;
  icon: boolean;
  type?: 'normal' | 'column' | 'line' | 'floor';
};

export type HorizontalFilterSetSliderInput = {
  id: string;
  label: string;
  minValue: number;
  maxValue: number;
  minLabel?: string;
  maxLabel?: string;
  valueLabel?: string;
  step: number;
  variant?: 'default' | 'dark';
};

export type HorizontalFilterSetDividerInput = {
  variant?: 'default' | 'dark';
};

export type HorizontalFilterSetLabelInput = {
  label: string;
};

export type HorizontalFilterSetTextFieldInput = {
  id: string;
  label?: string;
};

export type HorizontalFilterSetMenuInput = {
  id: string;
  label: string;
  options: Array<HorizontalFilterSetFilter>;
  variant?: 'default' | 'dark';
  className?: string;
};

export type HorizontalFilterSetInput =
  | HorizontalFilterSetMultiOptionInput
  | HorizontalFilterSetButtonInput
  | HorizontalFilterSetSliderInput
  | HorizontalFilterSetDividerInput
  | HorizontalFilterSetLabelInput
  | HorizontalFilterSetTextFieldInput
  | HorizontalFilterSetMenuInput
  | HorizontalFilterSetCustomInput;

export type HorizontalFilterSetInputProps<
  T extends
    | HorizontalFilterSetMultiOptionInput
    | HorizontalFilterSetButtonInput
    | HorizontalFilterSetSliderInput
    | HorizontalFilterSetDividerInput
    | HorizontalFilterSetLabelInput
    | HorizontalFilterSetTextFieldInput
    | HorizontalFilterSetMenuInput
    | HorizontalFilterSetCustomInput
> = T & {
  insideMenu: boolean;
  hint: string[];
  onInput: (id: string, value?: string | number | string[]) => void;
  labelFontColor?: string;
  disabled?: boolean;
  shouldDivideOptions?: boolean;
  type?: string;
  pattern?: string;
  inputMode?: string;
  onClick?: (id: string) => void;
};

export type HorizontalFilterSetFilter = {
  type: HorizontalFilterSetInputType;
  data: HorizontalFilterSetInput;
};
