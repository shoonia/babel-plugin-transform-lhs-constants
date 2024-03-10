import type { Node, BinaryExpression } from '@babel/types';
import { declare as declarePlugin } from '@babel/helper-plugin-utils';

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
]);

const plugin = declarePlugin((api) => {
  api.assertVersion(7);

  const t = api.types;

  return {
    name: 'transform-lhs-constants',
    visitor: {
      BinaryExpression(path) {
        const node = path.node;

        if (
          equalities.has(node.operator) &&
          literals.has(node.right.type) || t.isIdentifier(node.right, { name: 'undefined' })
        ) {
          [node.left, node.right as Node] = [node.right, node.left];
        }
      }
    },
  };
});

export { plugin as default };
