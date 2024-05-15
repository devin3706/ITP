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

export const getTotalStudents = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/totalStudents`);
      if (!response.ok) {
        throw new Error('Failed to fetch total number of students');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch total number of students: ' + error.message);
    }
};

export const getTotalTeachers = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/totalTeachers`);
      if (!response.ok) {
        throw new Error('Failed to fetch total number of teachers');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch total number of teachers: ' + error.message);
    }
};

export const getTotalFiles = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/totalFiles`);
      if (!response.ok) {
        throw new Error('Failed to fetch total number of files');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch total number of files: ' + error.message);
    }
};

export const getTotalClasses = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/totalClasses`);
      if (!response.ok) {
        throw new Error('Failed to fetch total number of classes');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch total number of classes: ' + error.message);
    }
};

export const getTotalExams = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/totalExams`);
      if (!response.ok) {
        throw new Error('Failed to fetch total number of Exams');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch total number of Exams: ' + error.message);
    }
};

export const getTotalTeacherLogins = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/totalTeacherLogins`);
      if (!response.ok) {
        throw new Error('Failed to fetch total number of teacher logins');
      }
      return await response.json();
    } catch (error) {
      throw new Error('Failed to fetch total number of teacher logins: ' + error.message);
    }
};

export const getStudentLoginsByMonth = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/student-logins-by-month`);
        if (!response.ok) {
            throw new Error('Failed to fetch student logins by month');
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getTeacherLoginsByMonth = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/teacher-logins-by-month`);
        if (!response.ok) {
            throw new Error('Failed to fetch teacher logins by month');
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getAdminLoginsByMonth = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/admin-logins-by-month`);
        if (!response.ok) {
            throw new Error('Failed to fetch admin logins by month');
        }
        return response.json();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getTeachersByDistrict = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/teachers-by-district`);        
        if (!response.ok) {
            throw new Error('Failed to fetch teachers grouped by district');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching teachers grouped by district:', error);
        throw error;
    }
};

export const getDistrictWithMostTeachers = async () => {
    try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/district-with-most-teachers`);
        if (!response.ok) {
            throw new Error('Failed to fetch district with most teachers');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching district with most teachers:', error);
        throw error;
    }
};