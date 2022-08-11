import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import NextAuth from "next-auth/next";
export default NextAuth({
    providers: [
        GoogleProvider({
          clientId:"1067769332518-cs4c3p08bdr1hms2fiavlgfi50po9a17.apps.googleusercontent.com",
          clientSecret:"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"
        }),
        FacebookProvider({
          clientId: "535649651665555",
          clientSecret: "p11f50ce3f45c1dc1b8a13ca7703ace93"
        })
        
      ],
      secret:"ef40e23352f9f8133b9e31172e758b81"
})
