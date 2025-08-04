import type { FormSchema } from '@ant-design/pro-form/es/components/SchemaForm';
import type { ProFormColumnsType } from '@ant-design/pro-components';
import { BetaSchemaForm } from '@ant-design/pro-components';
import { produce } from 'immer';

export type FormColumnType = Omit<ProFormColumnsType<any, any>, 'columns'> & {
  placeholder?: string;
  columns?: FormColumnType[] | ((values: any) => FormColumnType[]);
}

const SchemaForm = (props: Omit<FormSchema<any, any>, 'columns'> & {
  columns: FormColumnType[];
}) => {
  const {
    columns,
    ...formSchema
  } = props;

  const patchColumn = ($cols: FormColumnType[]): any[] => (
    produce($cols, (cols) => {
      cols?.forEach((col) => {
        const {
          fieldProps = {},
          placeholder,
          valueType,
          columns,
        } = col;

        if (placeholder) {
          if (typeof fieldProps === 'function') {
            col.fieldProps = (_form: any, _config: any): any => {
              const _fieldProps = fieldProps(_form, _config);
              if (!_fieldProps.placeholder)
                _fieldProps.placeholder = placeholder;
              return _fieldProps;
            };
          } else {
            const _fieldProps = fieldProps || {};
            if (!_fieldProps.placeholder)
              _fieldProps.placeholder = placeholder;
            col.fieldProps = _fieldProps;
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

  // @ts-ignore
  return (<BetaSchemaForm
    requiredMark={!0}
    columns={patchColumn(columns)}
    {...formSchema}
  />);
};

export default SchemaForm;
