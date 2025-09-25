import type * as babel from '@babel/core';
import type { Node, BinaryExpression } from '@babel/types';

type Plugin = (api: typeof babel) => babel.PluginObj<babel.PluginPass>;

const equalities = new Set<BinaryExpression['operator']>([
  '==',
  '===',
  '!=',
  '!==',
]);

const literals = new Set<Node['type']>([
  'NullLiteral',
  'StringLiteral',
  'NumericLiteral',
  'NumberLiteral', // @deprecated
  'BigIntLiteral',
  'BooleanLiteral',
  'TemplateLiteral',
]);

const plugin: Plugin = (api) => {
  const t = api.types;

  const isLiteral = (node: Node): boolean =>
    literals.has(node.type) ||
    t.isIdentifier(node, { name: 'undefined' }) ||
    t.isUnaryExpression(node, { operator: 'void' }) && t.isNumericLiteral(node.argument, null);

  return {
    name: 'transform-lhs-constants',
    visitor: {
      BinaryExpression(path) {
        const node = path.node;

        if (
          equalities.has(node.operator) &&
          isLiteral(node.right) && !isLiteral(node.left)
        ) {
          [node.left, node.right as Node] = [node.right, node.left];
        }
      },
    },
  };
};

export { plugin as default };
