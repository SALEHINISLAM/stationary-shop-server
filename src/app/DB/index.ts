import config from "../config"
import { USER_ROLE } from "../AllModules/Users/user.constant"
import { UserModel } from "../AllModules/Users/user.model"

const superUser={
    name:"Super Admin",
    email:config.SUPER_ADMIN_EMAIL,
    password:config.SUPER_ADMIN_PASS,
    role:USER_ROLE.superAdmin,
    isDeleted:false,
}

const seedSuperAdmin=async()=>{
    const isSuperAdminExists=await UserModel.findOne({role:USER_ROLE.superAdmin});
    if (!isSuperAdminExists) {
        await UserModel.create(superUser)
    }
}

export default seedSuperAdmin;