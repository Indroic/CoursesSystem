import { create } from "zustand";

import { GetModulesRequest } from "@/config/axios_auth";
import { ModuleInterface } from "@/types/courses";

interface ModuleState {
  modules: ModuleInterface[];
  addModule: (module: ModuleInterface) => void;
  updateModule: (module: ModuleInterface) => void;
  deleteModule: (module: ModuleInterface) => void;
  getModules: (getCourseModules: string) => void;
  getModule: (id: string) => void;
}



const useModules = create<ModuleState>((set) => ({
  modules: [],
  addModule: (module) =>
    set((state) => ({ ...state, modules: [...state.modules, module] })),
  updateModule: (module) =>
    set((state) => ({
      ...state,
      modules: state.modules.map((c: ModuleInterface) =>
        c.id === module.id ? module : c
      ),
    })),
  deleteModule: (module) =>
    set((state) => ({
      ...state,
      modules: state.modules.filter((c: ModuleInterface) => c.id !== module.id),
    })),
  getModules: async (getUsermodules) => {
    let response = await GetModulesRequest(getUsermodules);

    if (response.status === 200) {
      let modules = response.data;

      set((state) => ({ ...state, modules }));
    } else {
      set((state) => ({ ...state, modules: [] }));
    }
  },
  getModule: (id) =>
    set((state) => ({
      ...state,
      modules: state.modules.filter((c: ModuleInterface) => c.id === id),
    })),
}));

export default useModules;
