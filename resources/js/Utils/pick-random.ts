export default function pickRandom(arr: any[]) {
    // Flatten the arrays into a single array
    const allElements = arr.flat();

    // Check if the array is empty
    if (allElements.length === 0) {
        return null;
    }

    // Pick a random index from the combined array
    const randomIndex = Math.floor(Math.random() * allElements.length);

    // Return the element at the random index
    return allElements[randomIndex];
}
