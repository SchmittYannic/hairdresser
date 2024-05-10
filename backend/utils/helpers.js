export const parseError = err => {
    if (err.isJoi) return err.details[0];
    return JSON.stringify(err, Object.getOwnPropertyNames(err));
};

export const sessionizeUser = user => {
    return {
        userId: user.id ?? user._id.toString(),
        email: user.email,
    };
};

export const birthdayToString = (date) => {
    const options = {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    };
    return date.toLocaleDateString("de-DE", options)
}