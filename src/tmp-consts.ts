export const CHILDREN_DICT = {
    'a': ['d', 'e'],
    'c': ['g'],
    'd': ['c', 'h', 'i'],
    'e': ['g', 'i', 'f', 'j'],
    'g': ['k'],
    'h': ['k', 'l'],
    'i': ['h'],
    'j': ['l'],
    'k': ['m'],
    'l': ['m']
};

export const PARENTS_DICT = {
    'c': ['d'],
    'd': ['a'],
    'e': ['a'],
    'f': ['e'],
    'g': ['c', 'e'],
    'h': ['d', 'i'],
    'i': ['e', 'd'],
    'j': ['e'],
    'k': ['h', 'g'],
    'l': ['h', 'j'],
    'm': ['k', 'l']
};

export const VERTEXES_DICT = {
    'a': -1,
    'b': -1,
    'c': -1,
    'd': -1,
    'e': -1,
    'f': -1,
    'g': -1,
    'h': -1,
    'i': -1,
    'j': -1,
    'k': -1,
    'l': -1,
    'm': -1,
};
