export default function RadioInput({ name, value, defaultCheck }) {
    return (
        <>
            <input className="form-check-input" type="radio" name={name} value={value} defaultChecked={defaultCheck && true} required />
            <label className="form-check-label" htmlFor={name}>
                {value}
            </label>
        </>
    )
}