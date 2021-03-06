// 1. Make sure to import 'vue' before declaring augmented types
import Vue from 'vue'

// 2. Specify a file with the types you want to augment
//    Vue has the constructor type in types/vue.d.ts
declare module 'vue/types/vue' {
  // 3. Declare augmentation for Vue
  interface Vue {
    $myProperty: string
    userDetail?: any;
  }
}


// ComponentOptions is declared in types/options.d.ts
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
      myOption?: string
      userDetail?: any;
    }
}