/* eslint-disable react/no-danger */
import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import {
  brandingLightTheme as lightTheme,
  brandingDarkTheme as darkTheme,
} from '@mui/docs/branding';
import { useTranslate } from '@mui/docs/i18n';
import ExpandableApiItem, {
  ApiItemContaier,
} from 'docs/src/modules/components/ApiPage/list/ExpandableApiItem';

const StyledApiItem = styled(ExpandableApiItem)(
  ({ theme }) => ({
    '.slot-classname, .slot-default-element': {
      marginBottom: 8,
      '& .prop-list-title': {
        ...theme.typography.body2,
        fontWeight: theme.typography.fontWeightSemiBold,
        color: theme.palette.text.primary,
      },
    },
    '& .default-slot-value': {
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
    },
    '& .global-class-value': {
      ...theme.typography.caption,
      fontFamily: theme.typography.fontFamilyCode,
      fontWeight: theme.typography.fontWeightRegular,
      borderColor: alpha(darkTheme.palette.primary[100], 0.5),
      backgroundColor: `var(--muidocs-palette-primary-50, ${lightTheme.palette.primary[50]})`,
    },
  }),
  ({ theme }) => ({
    [`:where(${theme.vars ? '[data-mui-color-scheme="dark"]' : '.mode-dark'}) &`]: {
      '& .global-class-value': {
        borderColor: alpha(darkTheme.palette.primary[400], 0.1),
        backgroundColor: alpha(darkTheme.palette.primary[900], 0.4),
      },
    },
  }),
);

type HashParams = { componentName: string; className: string | null; name: string };

export function getHash({ componentName, className, name }: HashParams) {
  return `${componentName}-css-${className ?? name}`;
}

export type SlotsFormattedParams = {
  className: string | null;
  componentName: string;
  description?: string;
  name: string;
  defaultValue?: string;
};

interface SlotsListProps {
  slots: SlotsFormattedParams[];
  displayOption: 'collapsed' | 'expanded';
}

export default function SlotsList(props: SlotsListProps) {
  const { slots, displayOption } = props;
  const t = useTranslate();

  return (
    <ApiItemContaier className="MuiApi-slot-list">
      {slots.map((params) => {
        const { description, className, name, defaultValue, componentName } = params;

        const isExtendable = description || defaultValue || className;

        return (
          <StyledApiItem
            id={getHash({ componentName, className, name })}
            key={name}
            title={name}
            note=""
            type="slots"
            isExtendable={!!isExtendable}
            displayOption={displayOption}
          >
            {description && (
              <p
                dangerouslySetInnerHTML={{
                  __html: description,
                }}
              />
            )}
            {className && (
              <p className="slot-classname">
                <span className="prop-list-title">{t('api-docs.className')}:</span>{' '}
                <code
                  dangerouslySetInnerHTML={{ __html: `.${className}` }}
                  className="global-class-value"
                />
              </p>
            )}
            {defaultValue && (
              <p className="slot-default-element">
                <span className="prop-list-title">{t('api-docs.defaultComponent')}:</span>{' '}
                <code className="default-slot-value">{defaultValue}</code>
              </p>
            )}
          </StyledApiItem>
        );
      })}
    </ApiItemContaier>
  );
}
