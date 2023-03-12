import { useState } from "react"
import { Link } from 'react-router-dom'
import { useAuth } from "../contexts/AuthContext"

import Navbar from "../components/Navbar"


export default function Auth(props) {
    const { currentUser, signup, login } = useAuth()
    const [formType, setFormType] = useState('Log In')

    const handleSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        if (formType === 'Sign Up') {
            if (form.password.value !== form.confirmPassword.value) {
                return alert('passwords do not match')
            }
            else {
                const address = `${form.address_line1.value}, ${form.address_line2.value}`
                const promotions = form.promotions.checked
                signup(form.email.value, form.password.value, form.name.value, address, form.city.value, form.state.value, promotions)
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
        <>
            <Navbar />
            <div className="container">
                <div className="form-container">
                    <ul className="nav nav-tabs justify-content-center" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button onClick={switchFormType} className="nav-link" data-bs-toggle="tab" aria-controls="home-tab-pane" aria-selected="true">Sign Up</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button onClick={switchFormType} className="nav-link active" data-bs-toggle="tab" aria-controls="profile-tab-pane" aria-selected="false">Log In</button>
                        </li>
                    </ul>
                    <AuthForm formType={formType} handleSubmit={handleSubmit} />
                    {formType === 'Log In' &&
                        <Link to="/forgot-password">Forgot Password?</Link>}
                </div>
            </div >
        </>
    )
}

const AuthForm = ({ formType, handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            {formType === 'Sign Up' &&
                <>
                    <div className="form-group">
                        <label htmlFor="name" className="form-label">Name<span style={{ color: 'red' }}>*</span></label>
                        <input className="form-control" name="name" type="text" placeholder="First & Last Name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address_line1">Address Line 1<span style={{ color: 'red' }}>*</span></label>
                        <input className="form-control" name="address_line1" type="text" placeholder="line 1" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address_line2">Address Line 2</label>
                        <input className="form-control" name="address_line2" type="text" placeholder="line2(Optional)" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City<span style={{ color: 'red' }}>*</span></label>
                        <input className="form-control" name="city" type="text" placeholder="city" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State<span style={{ color: 'red' }}>*</span></label>
                        <input className="form-control" name="state" type="text" placeholder="state" required />
                    </div>
                </>
            }
            <div>
                <label htmlFor="email" className="form-label">Email<span style={{ color: 'red' }}>*</span></label>
                <input className="form-control" name="email" type="text" placeholder="email" required />
            </div>
            <div>
                <label htmlFor="password" className="form-label">Password<span style={{ color: 'red' }}>*</span></label>
                <input className="form-control" name="password" type="password" placeholder="password" required />
            </div>
            {formType === 'Sign Up' &&
                <>
                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password<span style={{ color: 'red' }}>*</span></label>
                        <input className="form-control" name="confirmPassword" type="password" placeholder="confirm password" required />
                    </div>
                    <div className="form-chek">
                        <input className="form-check-input" name="promotions" type="checkbox" />
                        <label htmlFor="promotions" className="form-check-label">I opt in to the receive promtional and newsletter mails</label>
                    </div>
                </>
            }
            <button className="btn btn-primary" type="submit">Submit</button>
        </form>
    )
}