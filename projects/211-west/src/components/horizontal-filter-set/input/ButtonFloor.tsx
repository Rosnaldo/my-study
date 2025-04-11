import { Box, Button } from '@material-ui/core';
import { useCallback } from 'react';
import clsx from 'clsx';

import { CheckCircle } from '@material-ui/icons';
import { useFilteredUnits } from '~/hooks/useFilteredUnits';

type Props = {
  id: string;
  label: string;
  hint: string[];
  onInput: (id: string, value: string) => void;
  icon?: boolean;
  disabled?: boolean;
};

export function ButtonFloor({
  id,
  label,
  hint,
  onInput,
  icon = false,
  disabled = false
}: Props) {
  const [{ filters }] = useFilteredUnits();
  const floors = filters.floors;
  const handleInput = useCallback(() => onInput(id, id), [id, onInput]);
  const show = floors.includes(id.replaceAll('floors__', ''));

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
