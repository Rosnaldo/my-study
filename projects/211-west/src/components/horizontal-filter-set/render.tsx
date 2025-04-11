import { useMemo } from 'react';
import { ButtonInput } from './input/Button';
import { DividerInput } from './input/Divider';
import { LabelInput } from './input/Label';
import { MenuInput } from './input/Menu';
import { MultiOptionInput } from './input/MultiOption';
import { SliderInput } from './input/Slider';
import { TextFieldInput } from './input/TextField';
import { TextWithIcon } from './input/TextWithIcon';
import {
  HorizontalFilterSetButtonInput,
  HorizontalFilterSetCustomInput,
  HorizontalFilterSetDividerInput,
  HorizontalFilterSetFilter,
  HorizontalFilterSetLabelInput,
  HorizontalFilterSetMenuInput,
  HorizontalFilterSetMultiOptionInput,
  HorizontalFilterSetSliderInput,
  HorizontalFilterSetTextFieldInput
} from './types';
import { useFilteredColumns } from '~/hooks/useFilteredColumns';

export function renderFilter(
  filter: HorizontalFilterSetFilter,
  idx: number,
  hint: string[],
  onInput: (id: string, value?: string | number | string[]) => void,
  insideMenu: boolean,
  labelFontColor?: string,
  disabled = false,
  shouldDivideOptions?: boolean,
  popoverClassName?: string
) {
  const [{ columns }] = useFilteredColumns();

  switch (filter.type) {
    case 'multi-option':
      return (
        <MultiOptionInput
          key={`horizontal-filter-set-${idx}`}
          {...(filter.data as HorizontalFilterSetMultiOptionInput)}
          hint={hint}
          onInput={onInput}
          insideMenu={insideMenu}
          disabled={disabled}
          shouldDivideOptions={shouldDivideOptions}
        />
      );
    case 'divider':
      return useMemo(
        () => (
          <DividerInput
            key={`horizontal-filter-set-${idx}`}
            {...(filter.data as HorizontalFilterSetDividerInput)}
            hint={hint}
            onInput={onInput}
            insideMenu={insideMenu}
          />
        ),
        [hint]
      );
    case 'button':
      return (
        <ButtonInput
          key={`horizontal-filter-set-${idx}`}
          {...(filter.data as HorizontalFilterSetButtonInput)}
          hint={hint}
          onInput={onInput}
          insideMenu={insideMenu}
          disabled={disabled}
        />
      );
    case 'slider':
      return useMemo(
        () => (
          <SliderInput
            key={`horizontal-filter-set-${idx}`}
            {...(filter.data as HorizontalFilterSetSliderInput)}
            hint={hint}
            onInput={onInput}
            insideMenu={insideMenu}
            shouldDivideOptions={shouldDivideOptions}
          />
        ),
        [filter.data]
      );
    case 'label':
      return useMemo(
        () => (
          <LabelInput
            key={`horizontal-filter-set-${idx}`}
            {...(filter.data as HorizontalFilterSetLabelInput)}
            hint={hint}
            onInput={onInput}
            insideMenu={insideMenu}
          />
        ),
        [hint]
      );
    case 'text-field':
      return (
        <TextFieldInput
          key={`horizontal-filter-set-${idx}`}
          {...(filter.data as HorizontalFilterSetTextFieldInput)}
          hint={hint}
          onInput={onInput}
          insideMenu={insideMenu}
        />
      );
    case 'text-field-with-icon':
      return useMemo(
        () => (
          <TextWithIcon
            key={`horizontal-filter-set-${idx}`}
            {...(filter.data as HorizontalFilterSetTextFieldInput)}
            hint={hint}
            onInput={onInput}
            insideMenu={insideMenu}
          />
        ),
        [filter.data]
      );

    case 'menu':
      return (
        <MenuInput
          key={`horizontal-filter-set-${idx}`}
          {...(filter.data as HorizontalFilterSetMenuInput)}
          hint={hint}
          onInput={onInput}
          insideMenu={insideMenu}
          labelFontColor={labelFontColor}
          shouldDivideOptions={shouldDivideOptions}
          className={popoverClassName}
        />
      );

    case 'custom':
      const Component = (filter.data as HorizontalFilterSetCustomInput)
        .Component;
      return (
        <Component
          key={`horizontal-filter-set-${idx}`}
          {...(filter.data as HorizontalFilterSetCustomInput)}
          hint={hint}
          onInput={onInput}
          insideMenu={insideMenu}
          shouldDivideOptions={shouldDivideOptions}
        />
      );

    default:
      return null;
  }
}
