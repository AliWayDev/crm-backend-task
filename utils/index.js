export function ok(data, message) {
    return {
        status: true,
        code: 200,
        message: message || "completed!",
        data,
    };
}

export function fail(code, message) {
    return {
        status: false,
        code,
        message,
        data: null,
    };
}