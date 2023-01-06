type Item = bigint;

interface Monkey {
    items: Item[];
    operation: (item: Item) => Item;
    divisibleBy: bigint;
    ifTrueNextId: number;
    ifFalseNextId: number;
    inspectedItems: number;
}

export function process(
    data: string[],
    NB_ROUNDS: number,
    divBy3 = true
): string {
    // Split data by monkeys
    const splitedData = data.reduce<string[][]>(
        (acc, val) => {
            if (val === "") {
                acc.push([]);
            } else {
                acc[acc.length - 1].push(val);
            }
            return acc;
        },
        [[]]
    );

    // Parse monkeys
    const monkeys = splitedData.map(parsingMonkey);

    const lcm = monkeys
        .map((monkey) => monkey.divisibleBy)
        .reduce((acc, val) => acc * val, BigInt(1));

    // Run monkeys `NB_ROUNDS` times
    const debugChecks = [1, 20];
    for (let i = 0; i < NB_ROUNDS; i++) {
        runMonkeys(monkeys, divBy3, lcm);

        if (debugChecks.includes(i + 1)) {
            console.log(monkeys.map((monkeys) => monkeys.inspectedItems));
        }
    }

    // Multiply top 2 monkey's inspected items
    const sortedInspectedItems = monkeys
        .map((monkey) => monkey.inspectedItems)
        .sort((a, b) => b - a);
    return (
        BigInt(sortedInspectedItems[0]) * BigInt(sortedInspectedItems[1])
    ).toString();
}

function operationFactory(operator: "+" | "*", coef?: bigint) {
    if (coef === undefined) {
        return (item: Item) => item * item;
    }

    if (operator === "+") {
        return (item: Item) => item + coef;
    } else {
        return (item: Item) => item * coef;
    }
}

function _testFactory(divNb: bigint) {
    return (item: Item) => item % divNb === 0n;
}

function parsingMonkey(serializedMonkey: string[]): Monkey {
    const items = Array.from(serializedMonkey[1].matchAll(/\d+/g), (item) =>
        BigInt(item[0])
    );

    const operator: "+" | "*" = /[+]/.test(serializedMonkey[2]) ? "+" : "*";
    const parsedCoef = serializedMonkey[2].match(/\d+/);
    const coef = parsedCoef !== null ? BigInt(parsedCoef[0]) : undefined;

    const operation = operationFactory(operator, coef);

    const divisibleBy = BigInt(serializedMonkey[3].match(/\d+/)![0]);

    const ifTrueNextId = Number.parseInt(
        serializedMonkey[4].match(/\d+/)![0],
        10
    );
    const ifFalseNextId = Number.parseInt(
        serializedMonkey[5].match(/\d+/)![0],
        10
    );

    return {
        items,
        operation,
        divisibleBy,
        ifTrueNextId,
        ifFalseNextId,
        inspectedItems: 0,
    };
}

/**
 * Inplace monkeys run
 */
function runMonkeys(monkeys: Monkey[], divBy3: boolean, lcm: bigint) {
    monkeys.forEach((monkey, _, arr) => {
        monkey.inspectedItems += monkey.items.length;

        // Apply operation
        monkey.items = monkey.items.map(monkey.operation);

        if (divBy3) {
            monkey.items = monkey.items.map((item) => item / BigInt(3));
        } else {
            monkey.items = monkey.items.map((item) => item % lcm);
        }

        // Split based on test
        const [trueItems, falseItems] = monkey.items.reduce<[Item[], Item[]]>(
            (acc, item) => {
                if (item % monkey.divisibleBy === 0n) {
                    acc[0].push(item);
                } else {
                    acc[1].push(item);
                }
                return acc;
            },
            [[], []]
        );

        arr[monkey.ifTrueNextId].items.push(...trueItems);
        arr[monkey.ifFalseNextId].items.push(...falseItems);
        monkey.items = [];
    });
}
