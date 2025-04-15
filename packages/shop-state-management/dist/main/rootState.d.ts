import { ModuleStateMapping } from '../modules/constants/keys'
export type RootState = {
  [K in keyof ModuleStateMapping]: ModuleStateMapping[K]
}
//# sourceMappingURL=rootState.d.ts.map
