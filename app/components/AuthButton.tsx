import { auth, signIn, signOut } from "@/app/lib/auth"


export default async function AuthButton() {
  // 1. Get the current session
    const session = await auth()
  
  // 2. If user is logged in, show their name + Sign Out button
    if(session?.user){
        return(
            <div>
                <h1>{session.user.name}</h1>
                <form
                    action={async () => {
                        "use server"
                        await signOut()
                    }}
                    >
                    <button>Sign Out</button>
                </form>
            </div>
        )
    }else{
        return(
            <div>
                <form
                    action={async () => {
                        "use server"
                        await signIn("github")
                    }}
                    >
                <button>Sign In</button>
                </form>
            </div>
        )
    }
}