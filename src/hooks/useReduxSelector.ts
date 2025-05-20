import type { RootState } from '../store/index.ts';
import type { TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;