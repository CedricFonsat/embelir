import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = import.meta.env.SUPABASE_URL
// const supabaseKey = import.meta.env.SUPABASE_KEY

const SUPABASE_URL="..."
const SUPABESE_KEY="..."
export const supabase = createClient(SUPABASE_URL, SUPABESE_KEY)