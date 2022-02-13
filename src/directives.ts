import { mapSchema, getDirective, MapperKind } from "@graphql-tools/utils";
import { ForbiddenError } from "apollo-server-core";
import { defaultFieldResolver, GraphQLSchema } from "graphql";

export function isAuthenticatedDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const isAuthenticatedDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];
      if (isAuthenticatedDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async function (source, args, context, info) {
          if (!context.user) {
            throw new ForbiddenError(
              "You are not authorized for this resource."
            );
          }

          return resolve(source, args, context, info);
        };
      }
      return fieldConfig;
    },
  });
}
