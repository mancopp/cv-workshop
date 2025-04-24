export const useComplexTypeJsonHandlers = () => {
  const stringifyReplacer = (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if (value instanceof Map) {
        return {
          _meta: { type: "map" },
          value: Array.from(value.entries()),
        };
      } else if (value instanceof Set) {
        return {
          _meta: { type: "set" },
          value: Array.from(value.values()),
        };
      } else if ("_meta" in value) {
        return {
          ...value,
          _meta: {
            type: "escaped-meta",
            value: value["_meta"],
          },
        };
      }
    }
    return value;
  };

  const parseReviver = (key: string, value: any) => {
    if (typeof value === "object" && value !== null) {
      if ("_meta" in value) {
        if (value._meta.type === "map") {
          return new Map(value.value);
        } else if (value._meta.type === "set") {
          return new Set(value.value);
        } else if (value._meta.type === "escaped-meta") {
          return {
            ...value,
            _meta: value._meta.value,
          };
        } else {
          console.warn("Unexpected meta", value._meta);
        }
      }
    }
    return value;
  };

  return {
    stringifyReplacer,
    parseReviver,
  };
};
