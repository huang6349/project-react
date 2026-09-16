/** 权限声明：key 以 $ 分隔层级（$a$b$c），值为该节点的直连判定结果 */
export type AccessDeclare = Record<string, boolean>;

/** 展开结果：含自动派生的中间层 key（如 $tenant） */
export type AccessMap<D extends AccessDeclare> = { [K in keyof D]: boolean } & Record<string, boolean>;

/** 权限树节点 */
type Node = {
  /** 显式声明的值（未声明时为 undefined） */
  declared?: boolean;
  /** 直接子节点 */
  children: Map<string, Node>;
};

// 拆分 key 为层级：'$a$b' → ['a', 'b']
const splitPath = (key: string) => (
  key.split('$').filter(Boolean)
);

// 按声明建树，中间层自动补节点
const buildTree = (declare: AccessDeclare) => {
  const root: Node = { children: new Map() };
  for (const [key, value] of Object.entries(declare)) {
    const path = splitPath(key);
    let node = root;
    for (const seg of path) {
      if (!node.children.has(seg)) node.children.set(seg, { children: new Map() });
      node = node.children.get(seg)!;
    }
    if (path.length) node.declared = value;
  }
  return root;
};

/** 建权限表：显式声明优先，未声明则任一直接子节点通过即通过 */
const safeAccess = <D extends AccessDeclare>(declare: D): AccessMap<D> => {
  const result: Record<string, boolean> = {};

  // 后序求值并展开：子节点始终遍历以产出自身 key，父节点只读其最终值
  const walk = (node: Node, prefix: string): boolean => {
    let derived = !1;
    for (const [seg, child] of node.children) {
      if (walk(child, `${prefix}$${seg}`)) derived = !0;
    }
    // 显式声明优先并阻断冒泡；未声明时任一直接子节点通过即通过；都没有则拒绝
    const value = node.declared ?? derived;
    if (prefix) result[prefix] = value;
    return value;
  };

  walk(buildTree(declare), '');
  return result as AccessMap<D>;
};

export default safeAccess;
