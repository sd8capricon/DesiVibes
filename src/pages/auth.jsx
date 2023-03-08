import { useRef, useState } from "react"
import { Link } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"


export default function Auth(props) {
    const { currentUser, signup, login } = useAuth()
    const [formType, setFormType] = useState('Sign Up')

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        if (formType === 'Sign Up') {
            if (form.password.value !== form.confirmPassword.value) {
                return alert('passwords do not match')
            }
            else {
                const address = `${form.address_line1.value}, ${form.address_line2.value}`
                signup(form.email.value, form.password.value, form.name.value, address, form.city.value, form.state.value)
            }
        }
        if (formType === 'Log In') {
            const res = login(form.email.value, form.password.value)
        }
    }

    const switchFormType = (e) => {
        setFormType(e.target.innerText)
    }

    return (
        <div>
            <h2>{currentUser?.email}</h2>
            <form onSubmit={handleSubmit}>
                {formType === 'Sign Up' &&
                    <>
                        <label htmlFor="name" className="form-label">Name</label>
                        <input className="form-control" name="name" type="text" placeholder="First & Last Name" />
                        <label htmlFor="address_line1">Address Line 1</label>
                        <input className="form-control" name="address_line1" type="text" placeholder="" required />
                        <label htmlFor="address_line2">Address Line 2</label>
                        <input className="form-control" name="address_line2" type="text" placeholder="" required />
                        <label htmlFor="city">City</label>
                        <input className="form-control" name="city" type="text" placeholder="" required />
                        <label htmlFor="state">State</label>
                        <input className="form-control" name="state" type="text" placeholder="" required />
                    </>
                }
                <label htmlFor="email" className="form-label">Email</label>
                <input className="form-control" name="email" type="text" placeholder="email" />
                <label htmlFor="password" className="form-label">Password</label>
                <input className="form-control" name="password" type="password" placeholder="password" />
                {formType === 'Sign Up' &&
                    <><label htmlFor="password" className="form-label">Password</label>
                        <input className="form-control" name="confirmPassword" type="password" placeholder="confirm password" /></>
                }
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
            <button onClick={switchFormType}>Sign Up</button>
            <button onClick={switchFormType}>Log In</button>
            {formType === 'Log In' &&
                <Link to="/forgot-password">Forgot Password?</Link>}
        </div>
    )
}