// Get user's geolocation
export async function getLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                resolve({
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                });
            }, reject);
        } else {
            reject(new Error('Geolocation not supported by this browser'));
        }
    });
}
