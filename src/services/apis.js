const BASE_URL = process.env.REACT_APP_BASE_URL


export const categories = {
    CATGORIES_API : BASE_URL + "/course/showAllCategories",
}

export const auth = {
    LOGIN_API : BASE_URL + "/auth/login",
    SIGNUP_API : BASE_URL + "/auth/signup",
}