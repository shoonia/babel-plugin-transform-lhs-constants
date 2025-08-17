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
  'TemplateLiteral',
]);

const plugin = declarePlugin((api) => {
  api.assertVersion(7);

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
});

export { plugin as default };
