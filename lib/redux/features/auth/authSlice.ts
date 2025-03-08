import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { signInWithPopup, signOut, type User } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { toast } from "@/components/ui/use-toast"

interface AuthState {
  user: User | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
}

export const signInWithGoogle = createAsyncThunk("auth/signInWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    toast({
      title: "ログインしました",
      description: `${result.user.displayName}さん、ようこそ！`,
    })
    return result.user
  } catch (error) {
    toast({
      title: "ログインに失敗しました",
      description: "もう一度お試しください",
      variant: "destructive",
    })
    return rejectWithValue("Login failed")
  }
})

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth)
    toast({
      title: "ログアウトしました",
    })
    return null
  } catch (error) {
    toast({
      title: "ログアウトに失敗しました",
      description: "もう一度お試しください",
      variant: "destructive",
    })
    return rejectWithValue("Logout failed")
  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload
      state.loading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signInWithGoogle.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
        state.error = null
      })
      .addCase(signInWithGoogle.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Unknown error"
      })
      .addCase(logout.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.loading = false
        state.error = null
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || "Unknown error"
      })
  },
})

export const { setUser, setLoading, setError } = authSlice.actions
export default authSlice.reducer

