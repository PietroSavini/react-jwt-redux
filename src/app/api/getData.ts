import { apiSlice } from "./apiSlice";

// mutation del builder per richiedere i dati della tabella 

export const getDataSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getData: builder.mutation({
            query: (data) => ({
                url:'/api/Test',
                method:'POST',
                body:{ data }
            }),
           
        }),
    })

})


//gli hook Query sono generati automaticamente da RTKQuery  ( use*NAME*Mutation )
export const { useGetDataMutation } = getDataSlice