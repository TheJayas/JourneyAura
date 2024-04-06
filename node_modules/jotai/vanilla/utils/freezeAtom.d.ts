import type { Atom } from 'jotai/vanilla';
export declare function freezeAtom<AtomType extends Atom<unknown>>(anAtom: AtomType): AtomType;
export declare function freezeAtomCreator<CreateAtom extends (...params: never[]) => Atom<unknown>>(createAtom: CreateAtom): CreateAtom;
