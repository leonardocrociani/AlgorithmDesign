function BoyerMoore(elements) {
    let candidate = null;
    let count = 0;

    for (let element of elements) {
        if (count == 0) {
            candidate = element;
            count = 1;
        } else if (element == candidate) {
            count++;
        } else {
            count--;
        }
    }

    return count > elements.length / 2
        ? candidate
        : 'No majority element found'
}

function generateRandomStream(objects, length = 8) {
    // This is not an actual stream, it's just an array. Why? To isolate and show BoyerMoore function.
    let fakeStream = [];
    while(length > 0) {
        fakeStream.push(objects[Math.floor(Math.random() * objects.length)])
        length--;
    }
    return fakeStream;
}

async function main() {
    const stream = generateRandomStream(['🍓', '🍎', '🫐']);
    const majorityElement = BoyerMoore(stream);
    console.log(`The majority element found: ${majorityElement}`);
}

main();

