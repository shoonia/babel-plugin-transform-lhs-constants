import type { Node, BinaryExpression } from '@babel/types';
import { declare as declarePlugin } from '@babel/helper-plugin-utils';

const equalities = new Set<BinaryExpression['operator']>([
  '==',
  '===',
  '!=',
  '!==',
]);

const types = new Set<Node['type']>([
  'NullLiteral',
  'StringLiteral',
  'NumericLiteral',
  'NumberLiteral', // @deprecated
  'BigIntLiteral',
  'BooleanLiteral',
]);

const plugin = declarePlugin((api) => {
  api.assertVersion(7);

  return {
    name: 'transform-lhs-constants',
    visitor: {
      BinaryExpression(path) {
        const node = path.node;

        if (
          equalities.has(node.operator) &&
          types.has(node.right.type)
        ) {
          [node.left, node.right as Node] = [node.right, node.left];
        }
      }
    },
  };
});

export { plugin as default };
