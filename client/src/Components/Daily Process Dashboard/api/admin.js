export const register = async ({ fName, lName, username, email, contact, password } = {}) => {
    const admin = { fName, lName, username, email, contact, password };

    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify(admin),
        });

        return await res.json();

    }catch(err){
        throw new Error(`Cannot register at the moment. ${err}`);

    }
};

export const login = async ({ username, email, password } = {}) => {
    const admin = { username, email, password };

    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
            method: "POST",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(admin),
        });

        return await res.json();

    }catch(err){
        throw new Error(`Cannot login at the moment. ${err}`);

    }
};

export const logout = async () => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/logout`, {
            method: "GET",
            credentials: "include",
        });

        return await res.json();

    }catch(err){
        console.log(err);

    }
};

export const getLoggedInAdmin = async () => {
    try{
        const res = await fetch(`${process.env.REACT_APP_API_URL}/admin`, {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch logged-in admin");
        }

        return await res.json();

    }catch(err){
        throw new Error("Please login to continue");
 
    }
};

export const adminById = async (adminID) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin/${adminID}`);
        if (!response.ok) {
            throw new Error('Failed to fetch admin details');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error('Failed to fetch admin details');
    }
};

export const view = async () => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/view`, {
            method: "GET",
            credentials: "include",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
        });

        if (!res.ok) {
            throw new Error("Failed to fetch admins");
        }

        return await res.json();
    } catch (err) {
        throw new Error(`Cannot fetch admins. ${err}`);
    }
};

export const deleteAdmin = async (adminID) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/${adminID}`, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            throw new Error("Failed to delete admin account");
        }

        return await res.json();
    } catch (error) {
        throw new Error(`Cannot delete admin account: ${error}`);
    }
};

export const update = async (adminID, updatedAdminData) => {
    try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/admin/${adminID}`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedAdminData),
        });

        if (!res.ok) {
            throw new Error('Failed to update admin details');
        }

        return await res.json();
    } catch (error) {
        throw new Error(`Cannot update admin details: ${error}`);
    }
};