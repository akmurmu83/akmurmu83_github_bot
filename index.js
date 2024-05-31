import jsonfile from 'jsonfile';
import moment from 'moment';
import simpleGit from 'simple-git';
import seedrandom from 'seedrandom';

const FILE_PATH = './data.json';
const rng = seedrandom();

const makeCommit = async (n) => {
    if (n === 0) {
        await simpleGit().push();
        return;
    }
    const x = Math.floor(rng() * 55); // random int between 0 and 54
    const y = Math.floor(rng() * 7); // random int between 0 and 6
    const DATE = moment().subtract(1, 'y').add(1, 'd').add(x, 'w').add(y, 'd').format();
    const data = { date: DATE };

    console.log(DATE);
    jsonfile.writeFile(FILE_PATH, data, async () => {
        await simpleGit().add(FILE_PATH).commit(DATE, { '--date': DATE });
        makeCommit(n - 1);
    });
};

makeCommit(100);
