import type { ProColumnType } from '@ant-design/pro-components';
import { isFunction } from 'lodash-es';
import { produce } from 'immer';

/** 可注入列属性 */
export type PatchableColumnType = ProColumnType<any, any> & {
  /** 占位符 */
  placeholder?: string;
  /** 权限编码 */
  access?: string;
  /** 链接地址 */
  linkHref?: string | ((record: any) => string);
};

/** 注入列属性：placeholder / access / linkHref */
const patchCols = (
  columns: PatchableColumnType[],
): any[] => (
  produce(columns, (cols) => {
    cols?.forEach((col) => {
      const {
        fieldProps = {},
        placeholder,
        access,
        linkHref,
      } = col;

      if (!placeholder && !access && !linkHref) return;

      if (isFunction(fieldProps) || isFunction(linkHref)) {
        col.fieldProps = (_form: any, _config: any): any => {
          const _fieldProps = isFunction(fieldProps)
            ? fieldProps(_form, _config)
            : fieldProps || {};
          const _record = _config?.entity || _config?.record;
          const _href = isFunction(linkHref) ? linkHref(_record) : linkHref;
          const _next = {
            ..._fieldProps,
          };
          if (placeholder && !_next.placeholder)
            _next.placeholder = placeholder;
          if (access && !_next.access)
            _next.access = access;
          if (_href && !_next.href)
            _next.href = _href;
          return _next;
        };
      } else {
        const _fieldProps = fieldProps || {};
        if (placeholder && !_fieldProps.placeholder)
          _fieldProps.placeholder = placeholder;
        if (access && !_fieldProps.access)
          _fieldProps.access = access;
        if (linkHref && !_fieldProps.href)
          _fieldProps.href = linkHref;
        col.fieldProps = _fieldProps;
      }
    });
  })
);

export default patchCols;
