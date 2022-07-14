const Alert = ({alertMessage}) => {

    const greenAlertStyle = {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'green',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        background: 'lightgrey'
    }

    const redAlertStyle = {
        fontSize: 20,
        fontStyle: 'italic',
        color: 'red',
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        background: 'lightgrey'
    }

    if (alertMessage !== null) {
        const message = alertMessage[0];
        const isGood = alertMessage[1];
        if (isGood) {
            return (
            <div style={greenAlertStyle}>
                {message}
            </div>
            )
        } else {
            return (
            <div style={redAlertStyle}>
                {message}
            </div>
            )
        }    
    } else {
        return (
            <>
            </>
        )
    }
}
export default Alert;