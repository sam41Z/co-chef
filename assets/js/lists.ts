type Compare<T> = (a: T, b: T) => boolean;

const Lists = {
  add: <T>(list: T[], item: T): T[] => {
    const copy = [...list];
    copy.push(item);
    return copy;
  },
  replace: <T>(list: T[], item: T, compare: Compare<T>): T[] => {
    const copy = [...list];
    const index = copy.findIndex((a) => compare(a, item));
    copy.splice(index, 1, item);
    return copy;
  },
  remove: <T>(list: T[], item: T, compare: Compare<T>): T[] => {
    const copy = [...list];
    const index = copy.findIndex((a) => compare(a, item));
    copy.splice(index, 1);
    return copy;
  },
};
export default Lists;
