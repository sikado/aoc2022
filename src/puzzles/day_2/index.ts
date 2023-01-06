export function process(
    data: string[],
    calculationMethod: typeof getRoundScore | typeof getScoreByOutcome
) {
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
const Shape: { [key: string]: number } = {
    A: 1,
    B: 2,
    C: 3,
    X: 1,
    Y: 2,
    Z: 3,
};

// Truth table (Win:6, Lose:0, Draw:3)
const Outcome: { [key: string]: number } = {
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

export function getRoundScore([opponent, self]: [string, string]): number {
    return Outcome[opponent + self] + Shape[self];
}

const RoundScore: { [key: string]: number } = {
    X: 0,
    Y: 3,
    Z: 6,
};

export function getScoreByOutcome([opponent, outcome]: [
    string,
    string
]): number {
    // Get play by outcome
    const [_, selfPlay] = Object.keys(Outcome)
        .filter(([oppPlay, _]) => oppPlay === opponent)
        .find((key) => Outcome[key] === RoundScore[outcome])!
        .split("");

    return RoundScore[outcome] + Shape[selfPlay];
}
