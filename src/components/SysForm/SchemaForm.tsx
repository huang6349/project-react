import type { FormColumnType } from './types';
import type { FormProps } from './types';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { produce } from 'immer';

const SchemaForm = (props: FormProps) => {
  const {
    columns,
    ...formSchema
  } = props;

  const patchColumn = ($cols: FormColumnType[]): any[] => (
    produce($cols, (cols) => {
      cols?.forEach((col) => {
        const {
          formItemProps = {},
          fieldProps = {},
          placeholder,
          required,
          hidden,
          valueType,
          columns,
        } = col;

        if (placeholder) {
          if (typeof fieldProps === 'function') {
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
          if (typeof formItemProps === 'function') {
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

        if (hidden) {
          if (typeof formItemProps === 'function') {
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

        if (columns && Array.isArray(columns)) {
          col.columns = patchColumn(columns);
        }

        if (valueType === 'dependency') {
          if (columns && typeof columns === 'function') {
            col.columns = (values): FormColumnType[] => (
              patchColumn(columns(values))
            );
          }
        }
      });
    })
  );


  return (<BetaSchemaForm
    layoutType='Form'
    requiredMark={!0}
    columns={patchColumn(columns)}
    {...formSchema}
  />);
};

export default SchemaForm;
