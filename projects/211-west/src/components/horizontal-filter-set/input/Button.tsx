import { Button } from '@material-ui/core';
import {
  HorizontalFilterSetButtonInput,
  HorizontalFilterSetInputProps
} from '../types';
import clsx from 'clsx';
import { ButtonColumn } from './ButtonColumn';
import { ButtonLine } from './ButtonLine';
import { ButtonFloor } from './ButtonFloor';
import { useCallback, useMemo } from 'react';

export function ButtonInput({
  id,
  label,
  hint,
  onInput,
  type = 'normal',
  icon = false,
  disabled = false
}: HorizontalFilterSetInputProps<HorizontalFilterSetButtonInput>) {
  const handleInput = useCallback(() => onInput(id, id), [id, onInput]);
  if (type === 'normal') {
    return useMemo(
      () => (
        <Button
          id={`horizontal-filter-set-${id}`}
          className={clsx('horizontal-filter-set-button', {
            hint: hint.includes(id)
          })}
          value={id}
          disabled={disabled}
          data-cy={`filter-${id}-button`}
          onClick={handleInput}
        >
          {label}
        </Button>
      ),
      [hint]
    );
  }

  if (type === 'column') {
    return (
      <ButtonColumn
        id={id}
        disabled={disabled}
        onInput={onInput}
        hint={hint}
        icon={icon}
        label={label}
      />
    );
  }

  if (type === 'line') {
    return useMemo(
      () => (
        <ButtonLine
          id={id}
          disabled={disabled}
          onInput={onInput}
          hint={hint}
          icon={icon}
          label={label}
        />
      ),
      [hint]
    );
  }

  if (type === 'floor') {
    return useMemo(
      () => (
        <ButtonFloor
          id={id}
          disabled={disabled}
          onInput={onInput}
          hint={hint}
          icon={icon}
          label={label}
        />
      ),
      [hint]
    );
  }

  return null;
}
