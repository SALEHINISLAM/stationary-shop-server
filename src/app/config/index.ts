import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT,
  DATABASE_URL: process.env.DATABASE_URL,
  bcrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDING,
  SUPER_ADMIN_EMAIL:process.env.SUPER_ADMIN_EMAIL,
  SUPER_ADMIN_PASS:process.env.SUPER_ADMIN_PASS,
  BCRYPT_NUM:process.env.BCRYPT_NUM,
  MODE:process.env.MODE,
  jwt_access_token:process.env.JWT_ACCESS_TOKEN,
  jwt_refresh_token:process.env.JWT_REFRESH_TOKEN,
  JWT_ACCESS_EXPIRES_IN:process.env.JWT_ACCESS_EXPIRES_IN,
  JWT_REFRESH_EXPIRES_IN:process.env.JWT_REFRESH_EXPIRES_IN
}
