import supabase from "./supabaseClient";

export const retrieveSession = async () => {

    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
        console.log(error);
        return error;
    } else {
        return data;
    }
    
}

export const retrieveNewSession = async () => {

    const { data, error } = await supabase.auth.refreshSession()

    if (error) {
        console.log(error);
        return error;
    } else {
        return data;
    }

}

export const retrieveUser = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    return user;

}

export const updateUser = async (metadata) => {

    const { data, error } = await supabase.auth.updateUser({
        data: metadata
    });

    if (error) {
        console.log(error);
        return error;
    } else {
        return data;
    }

}

export const getUserMetadata = (user) => {
    return user.user_metadata;
}

export const getUserEmail = (user) => {
    return user.email;
}