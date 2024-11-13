export default {
  rules: {
    'enum-key-value-match': {
      create(context) {
        return {
          TSEnumMember(node) {
            const key = node.id.name;
            const value = node.initializer && node.initializer.value;
            if (value && key !== value) {
              context.report({
                node,
                message: `Enum key "${key}" does not match its value "${value}".`,
              });
            }
          },
        };
      },
    },
  },
};
