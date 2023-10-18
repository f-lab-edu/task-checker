export const boardsKeys = {
  all: ["boards"],
  my: (ownerUID?: string) => [...boardsKeys.all, "my", { ownerUID }],
};
