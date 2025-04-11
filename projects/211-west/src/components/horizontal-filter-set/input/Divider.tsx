import { Divider } from '@material-ui/core';
import {
  HorizontalFilterSetDividerInput,
  HorizontalFilterSetInputProps
} from '../types';

export function DividerInput({
  insideMenu
}: HorizontalFilterSetInputProps<HorizontalFilterSetDividerInput>) {
  return (
    <Divider
      className="horizontal-filter-set-divider"
      variant="middle"
      orientation={insideMenu ? 'horizontal' : 'vertical'}
      flexItem
    />
  );
}
