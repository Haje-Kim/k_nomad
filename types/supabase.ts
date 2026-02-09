export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: Record<string, never>
    // Add your database tables here as you create them
    // Example:
    // profiles: {
    //   Row: {
    //     id: string
    //     email: string
    //     created_at: string
    //   }
    //   Insert: {
    //     id: string
    //     email: string
    //     created_at?: string
    //   }
    //   Update: {
    //     id?: string
    //     email?: string
    //     created_at?: string
    //   }
    // }
    Views: Record<string, never>
    // Add your database views here
    Functions: Record<string, never>
    // Add your database functions here
    Enums: Record<string, never>
    // Add your database enums here
  }
}
