import { showAlert } from "./alerts";

export const login = async (email, password) => {
    const data = {
        email,
        password
    }
    try {
        const rawResponse = await fetch('http://127.0.0.1:3000/api/v1/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        const res = await rawResponse.json();
        if (res.status === 'success') {
            showAlert('success', 'Logged in successfully')
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err)
    }

}

export const logout = async () => {
    try {
        const res = await fetch('http://127.0.0.1:3000/api/v1/users/logout')
        const data = await res.json()

        if (data.status === 'success') location.reload(true)
    } catch (err) {
        showAlert('error', 'Error logging out! Try again.')
    }
}