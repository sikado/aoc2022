/**
 * @param {string[]} data input data
 * @param {any} calculationMethod calculation methode by round
 * @returns {any}
 */
function process(data, calculationMethod) {
    return (
        data
            // Filter out invalid lines
            .filter((item) => item.length === 3)
            // Map round to score
            .map(([a, _, b]) => calculationMethod([a, b]))
            // Sum up round scores
            .reduce((acc, val) => acc + val, 0)
    );
}

// Scores by shape
const Shape = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
};

// Truth table (Win:6, Lose:0, Draw:3)
const Outcome = {
    AX: 3, // Rock - Rock
    AY: 6, // Rock - Paper
    AZ: 0, // Rock - Scissors
    BX: 0, // Paper - Rock
    BY: 3, // Paper - Paper
    BZ: 6, // Paper - Scissors
    CX: 6, // Scissors - Rock
    CY: 0, // Scissors - Paper
    CZ: 3, // Scissors - Scissors
};

/**
 *
 * @param {[string, string]} round
 * @returns {number}
 */
function getRoundScore([opponent, self]) {
    return Outcome[opponent + self] + Shape[self];
}

const RoundScore = {
    X: 0,
    Y: 3,
    Z: 6,
};

function getScoreByOutcome([opponent, outcome]) {
    // Get play by outcome
    const [_, selfPlay] = Object.keys(Outcome)
        .filter(([oppPlay, _]) => oppPlay === opponent)
        .find((key) => Outcome[key] === RoundScore[outcome]);

    return RoundScore[outcome] + Shape[selfPlay];
}

module.exports = { process, getRoundScore, getScoreByOutcome };
