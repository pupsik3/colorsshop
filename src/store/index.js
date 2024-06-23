import { createStore } from 'vuex'
import { DataModule } from "./DataModule"

export default createStore({
  modules: {
    data: DataModule
  }
})
