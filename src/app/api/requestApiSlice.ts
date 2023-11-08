import { apiSlice } from "./apiSlice";

//mutation che fa una chiamata GET all' endpoint /test 

export const requestSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        request: builder.mutation({
            query: () => ({
                url: `/api/Test`,
                method: 'GET',
            })
        }),
    })

})


//gli hook Mutation sono generati automaticamente da RTKQuery  ( use*NAME*Mutation )
export const { useRequestMutation } = requestSlice