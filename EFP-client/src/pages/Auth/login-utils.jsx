export const inputPasswordRules = [
    {
        required: true,
        message: 'Please input your password!',
    },
    {
        min: 6,
        message: 'Password must be at least 6 characters long!',
    },
    {
        max: 20,
        message: 'Password cannot exceed 20 characters!',
    },
    {
        pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]*$/,
        message: 'Include letter, number, and optional specials',
    },
]

export const inputUserNameRules = [
    {
        required: true,
        message: 'Please input your Username!',
    },
    {
        min: 3,
        message: 'Username must be at least 3 characters long!',
    },
    {
        max: 25,
        message: 'Username cannot exceed 25 characters!',
    },
    {
        pattern: /^[a-zA-ZA0-9_ ]*$/,
        message: 'Username can only contain letters, numbers, underscores, and spaces!',
    },
]

export const styles = {
    loginForm: {
        // backgroundColor: '#1F1F1F',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 60,
        width: 500,
        margin: 'auto auto',
        boxShadow: '0 0 10px',
    },
    loginTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    formInput: {
        color: 'red',
        borderRadius: 5,
        paddingInline: 10,
        height: 50
    },
    btnSubmit: {
        color: 'white',
        backgroundColor: '#006df0',
        minWidth: '100%',
        margin: '0 auto',
        borderRadius: 10,
        height: 50,
        marginTop: 40
    }
}

