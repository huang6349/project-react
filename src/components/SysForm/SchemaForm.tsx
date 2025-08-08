import type { FormColumnType } from './types';
import type { FormProps } from './types';
import { useMemo } from 'react';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { isFunction } from 'lodash-es';
import { isArray } from 'lodash-es';
import { eq } from 'lodash-es';
import { filterFormCols } from './filterCols';
import { produce } from 'immer';

const SchemaForm = (props: FormProps) => {
  const {
    columns,
    ...formSchema
  } = props;

  const $cols = useMemo(() => {
    const patch = ($cols: FormColumnType[]): any[] => (
      produce($cols, (cols) => {
        cols?.forEach((col) => {
          const {
            fieldProps = {},
            formItemProps = {},
            placeholder,
            required,
            showSearch,
            hidden,
            valueType,
            columns,
          } = col;

          if (placeholder) {
            if (isFunction(fieldProps)) {
              col.fieldProps = (_form: any, _config: any): any => {
                const _fieldProps: any = fieldProps(_form, _config);
                if (!_fieldProps.placeholder)
                  _fieldProps.placeholder = placeholder;
                return _fieldProps;
              };
            } else {
              const _fieldProps: any = fieldProps || {};
              if (!_fieldProps.placeholder)
                _fieldProps.placeholder = placeholder;
              col.fieldProps = _fieldProps;
            }
          }

          if (required) {
            if (isFunction(formItemProps)) {
              col.formItemProps = (_form: any, _config: any): any => {
                const _formItemProps: any = formItemProps(_form, _config);
                if (!_formItemProps.rules)
                  _formItemProps.rules = [];
                _formItemProps.rules.push({ required: true });
                return _formItemProps;
              };
            } else {
              const _formItemProps: any = formItemProps || {};
              if (!_formItemProps.rules)
                _formItemProps.rules = [];
              _formItemProps.rules.push({ required: true });
              col.formItemProps = _formItemProps;
            }
          }

          if (showSearch) {
            if (isFunction(fieldProps)) {
              col.fieldProps = (_form: any, _config: any): any => {
                const _fieldProps: any = fieldProps(_form, _config);
                if (!_fieldProps.showSearch)
                  _fieldProps.showSearch = showSearch;
                return _fieldProps;
              };
            } else {
              const _fieldProps: any = fieldProps || {};
              if (!_fieldProps.showSearch)
                _fieldProps.showSearch = showSearch;
              col.fieldProps = _fieldProps;
            }
          }

          if (hidden) {
            if (isFunction(formItemProps)) {
              col.formItemProps = (_form: any, _config: any): any => {
                const _formItemProps: any = formItemProps(_form, _config);
                if (!_formItemProps.hidden)
                  _formItemProps.hidden = hidden;
                return _formItemProps;
              };
            } else {
              const _formItemProps: any = formItemProps || {};
              if (!_formItemProps.hidden)
                _formItemProps.hidden = hidden;
              col.formItemProps = _formItemProps;
            }
          }

          if (isArray(columns)) {
            col.columns = patch(columns);
          }

          if (eq(valueType, 'dependency') && isFunction(columns)) {
            col.columns = (values): FormColumnType[] => (
              patch(columns(values))
            );
          }
        });
      })
    );
    return patch(filterFormCols(columns));
  }, [columns]);

  return (<BetaSchemaForm
    layoutType='Form'
    requiredMark={!0}
    {...formSchema}
    columns={$cols}
  />);
};

export default SchemaForm;
