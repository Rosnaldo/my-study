import { Box, Button } from '@material-ui/core';
import { useCallback } from 'react';
import clsx from 'clsx';
import { CheckCircle } from '@material-ui/icons';
import { useFilteredColumns } from '~/hooks/useFilteredColumns';

type Props = {
  id: string;
  label: string;
  hint: string[];
  onInput: (id: string, value: string) => void;
  icon?: boolean;
  disabled?: boolean;
};

export function ButtonColumn({
  id,
  label,
  hint,
  onInput,
  icon = false,
  disabled = false
}: Props) {
  const [{ columns }] = useFilteredColumns();
  const handleInput = useCallback(() => onInput(id, id), [id, onInput]);
  const show = columns.includes(id.replaceAll('residence_', '').toUpperCase());

  return (
    <Button
      id={`horizontal-filter-set-${id}`}
      className={clsx('horizontal-filter-set-button', {
        hint: hint.includes(id)
      })}
      value={id}
      onClick={handleInput}
      disabled={disabled}
      data-cy={`filter-${id}-button`}
    >
      <Box
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        {label}
        {icon && show && <CheckCircle />}
      </Box>
    </Button>
  );
}
