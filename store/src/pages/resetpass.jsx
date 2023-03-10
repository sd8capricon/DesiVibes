import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'

export default function ResetPass() {
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(form.email.value)
            setMessage('Check your inbox for further instructions')
        } catch {
            setError('Failed to reset password')
        }
        setLoading(false)
    }

    return (
        <div>
            <h2>Reset Password</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" className="form-label">Email</label>
                <input className="form-control" name="email" type="text" placeholder="email" />
                <button className="btn btn-primary" type="submit">Submit</button>
            </form>
        </div>
    )
}