export function isValidUrl(url: string): boolean {
    try {
        new URL(url)
        return true
    } catch (error) {
        return false;
    }
}

export function generateShortCode(length: number = 6): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}