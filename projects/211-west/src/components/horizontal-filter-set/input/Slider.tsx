import {
  Box,
  Divider,
  makeStyles,
  Slider,
  Theme,
  Typography
} from '@material-ui/core';
import { useCallback, useState } from 'react';
import clsx from 'clsx';
import {
  HorizontalFilterSetInputProps,
  HorizontalFilterSetSliderInput
} from '../types';
import debounce from 'lodash/debounce';

interface StyleProps {
  variant: 'default' | 'dark';
}

const useStyles = makeStyles<Theme, StyleProps>((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'column nowrap',
    alignItems: 'center',
    margin: `1rem !important`,
    marginBottom: '0 !important'
  },
  label: {
    margin: '0.5em',
    flex: '1 0 100%'
  },
  valueLabel: {
    marginBottom: '0.5em'
  },
  sliderContainer: {
    width: '100%',
    padding: '0 2rem'
  },
  slider: {
    color: ({ variant }) => (variant === 'dark' ? 'white' : 'inherit')
  }
}));

export function convertSqFt2SqM(sqFt: number): number {
  return sqFt / 10.763911105;
}

export function SliderInput({
  id,
  insideMenu,
  label,
  maxValue,
  minValue,
  maxLabel,
  minLabel,
  valueLabel,
  step,
  hint,
  onInput,
  shouldDivideOptions,
  variant = 'default'
}: HorizontalFilterSetInputProps<HorizontalFilterSetSliderInput>) {
  const classes = useStyles({ variant });
  const [value, setValue] = useState(
    parseInt(
      hint.find((hint) => hint.startsWith(`${id}__`))?.replace(`${id}__`, '') ||
        `${maxValue}`
    )
  );

  const handleFilterDone = useCallback(
    (number: number) => {
      onInput && onInput(id, number);
    },
    [id, onInput]
  );

  const renderValueLabel = () => {
    if (minLabel && value === minValue) return minLabel;
    if (maxLabel && value === maxValue) return maxLabel;

    if (valueLabel) {
      return valueLabel.replace(/\$value/g, value.toLocaleString()).replace(
        /\$toSqM/g,
        convertSqFt2SqM(value).toLocaleString(undefined, {
          maximumFractionDigits: 2
        })
      );
    }
    return value;
  };

  const debounceHandleChange = debounce((value: number) => {
    handleFilterDone(value);
  }, 200);

  const handleInput = useCallback(
    (_: React.ChangeEvent<{}>, sliderValue: number | number[]) => {
      const value = sliderValue as number;
      setValue(value);
      debounceHandleChange(value);
    },
    [id]
  );

  return (
    <Box
      className={clsx('horizontal-filter-set-slider', classes.root)}
      id={`horizontal-filter-set-${id}`}
    >
      {label && (
        <Typography
          className={clsx('horizontal-filter-set-slider-label', classes.label)}
        >
          {label}
        </Typography>
      )}
      {insideMenu && shouldDivideOptions && <Divider flexItem />}
      <Box className={classes.sliderContainer}>
        <Slider
          min={minValue}
          max={maxValue}
          step={step}
          value={value}
          onChange={handleInput}
          className={classes.slider}
        />
      </Box>
      <Box
        style={{
          marginBottom: '1rem',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 2rem'
        }}
      >
        <Typography style={{ fontSize: '1.3rem' }}>
          {minLabel || minValue.toLocaleString()}
        </Typography>
        <Typography className={classes.valueLabel}>
          {renderValueLabel()}
        </Typography>
        <Typography style={{ fontSize: '1.3rem' }}>3K+</Typography>
      </Box>
      {insideMenu && <Divider flexItem />}
    </Box>
  );
}
