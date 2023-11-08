import { apiSlice } from "./apiSlice";

//questa chiamata va direttamente all'endpoint di refresh per riprendere accesstoken e username da risalvare nello state al refresh della pagina
//ci permette di mantenere il logIn al refresh della pagina

export const PersistLoginSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
      persistLogin: builder.mutation({
        query: () => ({
          url: '/api/Test/Refresh',
          method: 'POST',
        }),
      }),
    }),
  });
  
  //gli hook Mutation sono generati automaticamente da RTKQuery  ( use*NAME*Mutation )
  export const { usePersistLoginMutation } = PersistLoginSlice;