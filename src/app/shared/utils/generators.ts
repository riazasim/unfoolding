export function MultipleEntityDataGenerator<T>(singleEntityGenerator: () => T): (count: number) => T[];
export function MultipleEntityDataGenerator<T, GenArgs>(singleEntityGenerator: (args: GenArgs) => T): (count: number, args: GenArgs | GenArgs[]) => T[];

export function MultipleEntityDataGenerator<T, GenArgs>(singleEntityGenerator: (args?: GenArgs | GenArgs[]) => T):
  (count: number, args: GenArgs[]) => T[] {
  return (count: number, args: GenArgs[]) => {
    const entities: T[] = [];
    if (Array.isArray(args)) {
      for (let i = 0; i < count; i++) {
        entities.push(singleEntityGenerator(args[i]));
      }
    } else if (typeof args !== 'undefined') {
      for (let i = 0; i < count; i++) {
        entities.push(singleEntityGenerator(args));
      }
    } else {
      for (let i = 0; i < count; i++) {
        entities.push(singleEntityGenerator());
      }
    }

    return entities;
  };
}
