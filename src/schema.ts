export type Json = string | number | boolean | null | { [key: string]: Json } | Json[]

export interface Database {
    public: {
        Tables: {
            pages: {
                Row: {
                    archived: boolean
                    content: Json | null
                    created_at: string
                    id: string
                    parent_id: string | null
                    title: string
                    updated_at: string
                    user_id: string
                }
                Insert: {
                    archived?: boolean
                    content?: Json | null
                    created_at?: string
                    id?: string
                    parent_id?: string | null
                    title?: string
                    updated_at?: string
                    user_id: string
                }
                Update: {
                    archived?: boolean
                    content?: Json | null
                    created_at?: string
                    id?: string
                    parent_id?: string | null
                    title?: string
                    updated_at?: string
                    user_id?: string
                }
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    full_name: string | null
                    id: string
                    updated_at: string | null
                    username: string | null
                    website: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    full_name?: string | null
                    id: string
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    full_name?: string | null
                    id?: string
                    updated_at?: string | null
                    username?: string | null
                    website?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
