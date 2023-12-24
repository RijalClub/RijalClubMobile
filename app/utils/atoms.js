import { atom } from 'jotai';

export const userAtom = atom(null);

export const emailAtom = atom('');

export const passwordAtom = atom('');

export const checkedEmailAtom = atom(false);

export const userExistsAtom = atom(false);