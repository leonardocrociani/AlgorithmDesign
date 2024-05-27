function BoyerMoore(stream) {
    let maj = null;
    let count = 0;

    for (let element of stream) {
        if (count == 0) {
            maj = element;
            count = 1;
        } else if (element == maj) {
            count++;
        } else {
            count--;
        }
    }

    return maj;
}

function generateRandomStream(objects, length = 10e6) {
    // This is not an actual stream, it's just an array. Why? To isolate and show BoyerMoore function.
    let fakeStream = [];
    while(length > 0) {
        fakeStream.push(objects[Math.floor(Math.random() * objects.length)])
        length--;
    }
    return fakeStream;
}

async function main() {
    const stream = generateRandomStream(['🍓', '🍎', '🫐', '🍊', '🍋']);
    const majorityElement = BoyerMoore(stream);
    console.log(`The majority element found: ${majorityElement}`);
}

main();
