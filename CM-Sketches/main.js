class CMSketch {

    constructor(hashFamily, delta, epsilon, verbose=true) {
        this.verbose = verbose;
        this.hashFamily = hashFamily;
        this.delta = delta;
        this.epsilon = epsilon;
        this.sketch = [];

        const numRows = Math.floor(Math.log2(1 / delta));
        const numCols = Math.floor(Math.E / epsilon);

        if (verbose) console.log('CM-Sketch initialized with size:', numRows,'X', numCols)

        for (let j = 0; j < numRows; j++) {
            const row = new Array(numCols).fill(0);
            this.sketch.push(row);
        }
    }

    insert(i) {
        for (let j = 0; j < this.sketch.length; j++) {
            const hashFn = this.hashFamily[j];
            const index = hashFn(i);
            this.sketch[j][index]++;
            if (this.verbose) console.log(`Inserted ${i} in row ${j}, column ${index}`);
        }
    }

    query(i) {
        let min = Infinity;

        for (let j = 0; j < this.sketch.length; j++) {
            const hashFn = this.hashFamily[j];
            const index = hashFn(i);
            const val = this.sketch[j][index];
            min = Math.min(min, val);
        }

        return min;
    }
}

const delta = 0.01;
const epsilon = 0.01;
const numCols = Math.floor(Math.E / epsilon);

const hash1 = x => Math.floor(((x * 31 + 7) % 101) % numCols);
const hash2 = x => Math.floor(((x * 17 + 13) % 101) % numCols);
const hash3 = x => Math.floor(((x * 19 + 29) % 101) % numCols);
const hash4 = x => Math.floor(((x * 23 + 31) % 101) % numCols);
const hash5 = x => Math.floor(((x * 29 + 37) % 101) % numCols);
const hash6 = x => Math.floor(((x * 37 + 41) % 101) % numCols);

const hashFamily = [hash1, hash2, hash3, hash4, hash5, hash6];

const cmSketch = new CMSketch(hashFamily, delta, epsilon);

cmSketch.insert(42);
cmSketch.insert(42);
cmSketch.insert(27);

console.log(cmSketch.query(42));    // 2
console.log(cmSketch.query(27));    // 1
console.log(cmSketch.query(13));    // 0
