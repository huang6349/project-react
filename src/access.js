import { checkConfigs } from '@/utils';
import { checkPerm } from '@/utils';
import { safeAccess } from '@/utils';

// 权限声明：只列叶子，父级（如 $system）由 safeAccess 按「任一子节点通过即通过」派生
export default () => safeAccess({
  $configs: checkPerm('*'),
  $account: !0,
  $system$tenant: checkConfigs('tenantEnabled') && checkPerm('@tenant:query'),
  $system$user: checkPerm('@user:query'),
  $system$role: checkPerm('@role:query'),
  $system$perm: checkPerm('@perm:query'),
  $tenant$query: checkConfigs('tenantEnabled') && checkPerm('@tenant:query'),
  $tenant$create: checkConfigs('tenantEnabled') && checkPerm('@tenant:add'),
  $tenant$update: checkConfigs('tenantEnabled') && checkPerm('@tenant:update'),
  $tenant$delete: checkConfigs('tenantEnabled') && checkPerm('@tenant:delete'),
  $tenant$auth: checkConfigs('tenantEnabled') && checkPerm('@tenant:update'),
  $user$query: checkPerm('@user:query'),
  $user$create: checkPerm('@user:add'),
  $user$update: checkPerm('@user:update'),
  $user$delete: checkPerm('@user:delete'),
  $role$query: checkPerm('@role:query'),
  $role$create: checkPerm('@role:add'),
  $role$update: checkPerm('@role:update'),
  $role$delete: checkPerm('@role:delete'),
  $role$auth: checkPerm('@role:update'),
  $perm$query: checkPerm('@perm:query'),
  $perm$create: checkPerm('@perm:add'),
  $perm$update: checkPerm('@perm:update'),
  $perm$delete: checkPerm('@perm:delete'),
});
