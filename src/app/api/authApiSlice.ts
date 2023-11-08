import { apiSlice } from "./apiSlice";

// mutation del builder per il Login 

export const LoginSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/api/Test/Login',
                method: 'POST',
                body:{...credentials}
            })
        }),
    })

})


//gli hook Mutation sono generati automaticamente da RTKQuery  ( use*NAME*Mutation )
export const { useLoginMutation } = LoginSlice

