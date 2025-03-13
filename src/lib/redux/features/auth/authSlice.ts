import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import { signInWithPopup, signOut, type User } from "firebase/auth"
import { auth, googleProvider } from "@/lib/firebase"
import { toast } from "sonner"

// シリアライズ可能なユーザー情報の型を定義
interface SerializableUser {
  uid: string
  email: string | null
  displayName: string | null
  photoURL: string | null
}

interface AuthState {
  user: SerializableUser | null
  loading: boolean
  error: string | null
  registrationPaused: boolean  // 新規登録一時停止フラグを追加
}

const initialState: AuthState = {
  user: null,
  loading: true,
  error: null,
  registrationPaused: true  // デフォルトで一時停止状態に設定
}

// Firebaseユーザーオブジェクトからシリアライズ可能なオブジェクトに変換する関数
const serializeUser = (user: User): SerializableUser => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
})

export const signInWithGoogle = createAsyncThunk("auth/signInWithGoogle", async (_, { rejectWithValue }) => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    toast.success("ログインしました", {
      description: `${result.user.displayName}さん、ようこそ！`,
    })
    return serializeUser(result.user)
  } catch (error) {
    toast.error("ログインに失敗しました", {
      description: "もう一度お試しください",
    })
    return rejectWithValue("Login failed")
  }
})

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await signOut(auth)
    toast.success("ログアウトしました")
    return null
  } catch (error) {
    toast.error("ログアウトに失敗しました", {
      description: "もう一度お試しください",
    })
    return rejectWithValue("Logout failed")
  }
})

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SerializableUser | null>) => {
      state.user = action.payload
      state.loading = false
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload
    },
    setRegistrationPaused: (state, action: PayloadAction<boolean>) => {
      state.registrationPaused = action.payload
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

export const { setUser, setLoading, setError, setRegistrationPaused } = authSlice.actions
export default authSlice.reducer

