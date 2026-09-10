import { withResponse } from '@/hofs';
import { ProForm } from '@ant-design/pro-components';
import { ProFormText } from '@ant-design/pro-components';
import { message } from '@/components';
import { useModel } from '@umijs/max';
import { useRequest } from 'alova/client';
import service from '../service';

const BasicView = () => {
  const {
    refresh,
  } = useModel('@@initialState');

  // 1. 提交请求
  const {
    send: update,
  } = useRequest((data) => (
    service.update(data)
  ), {
    immediate: !1,
  }).onSuccess(withResponse(() => {
    message.success('设置更新成功');
    // 重新拉取全局配置，系统名称/标语即时生效
    refresh()?.catch(() => {
    });
  }));

  // 2. 事件处理：组装配置模块 code 后提交
  const handleFinish = (configs) => (
    update({ code: 'system', configs })
  );

  // 3. 渲染输出：request 原生加载配置并回填表单（加载态由 ProForm 内部管理）
  return (<ProForm
    className='py-3.5'
    layout='vertical'
    request={service.dataConfigs('system')}
    onFinish={handleFinish}>
    <ProFormText
      width='md'
      name='name'
      label='系统名称'
      placeholder='请输入系统名称' />
    <ProFormText
      width='md'
      name='slogan'
      label='系统标语'
      placeholder='请输入系统标语' />
  </ProForm>);
};

export default BasicView;
