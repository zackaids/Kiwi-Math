import "./Toggle.css";

export function Toggle({handleChange, isChecked}) {
    return (
        <div className="toggle-container">
            <input
                type="checkbox"
                id="check"
                className="toggle"
                onChange={handleChange}
                checked={isChecked}
            />
            <label htmlFor="check">DarkMode</label>
        </div>
    )
}