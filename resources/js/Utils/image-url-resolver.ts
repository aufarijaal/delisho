export function resolveFinalImageUrl(filename: string) {
    return `${location.origin}/storage/finalimages/${filename}`;
}

export function resolveProfilePictureUrl(filename: string) {
    return `${location.origin}/storage/profilepictures/${filename}`;
}

export function resolveStepImageUrl(filename: string) {
    return `${location.origin}/storage/stepimages/${filename}`;
}
