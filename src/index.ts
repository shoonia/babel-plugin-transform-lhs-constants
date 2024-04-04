import type { Node, BinaryExpression, Identifier } from '@babel/types';
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

  const isLiteral = (node: Node): node is Identifier =>
    literals.has(node.type) || t.isIdentifier(node, { name: 'undefined' });

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
      }
    },
  };
});

export { plugin as default };
