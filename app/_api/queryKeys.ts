const usersKeys = {
  all: ["users"],
  users: () => [...usersKeys.all],
};

const boardsKeys = {
  all: ["boards"],
  my: (ownerUID?: string) => [...boardsKeys.all, "my", { ownerUID }],
};

export { usersKeys, boardsKeys };
