const InputField = ({ label, type, placeholder, value, onChange, required }) => {
    return (
        <div style={{marginTop: '10px', display: 'flex', flexDirection: 'column'}}>
            <label style={{marginRight:'10px'}}>{label}{required && <span>*</span>}</label>
            <input
            style={{outline: 'none' , border:'1px solid gray', borderRadius: '4px'}}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                required={required}
            />
        </div>
    );
};

export default InputField;