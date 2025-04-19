export function generateRandomUuidForYjsDoc(): string {
    let uuid = "";
    while (uuid === "") {
        uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (char) => {
            let random = (Math.random() * 16) | 0;
            let value = char === 'x' ? random : (random & 0x3) | 0x8;
            return value.toString(16);
        });
        
        // TODO: Check if the generated UUID is already in use
        // if (isUuidInUse(uuid))
        //   uuid = "";
    }
    return uuid;
}
