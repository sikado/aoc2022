import bigInt from "big-integer";

type Item = bigInt.BigInteger;

interface Monkey {
    items: Item[];
    operation: (item: Item) => Item;
    test: (item: Item) => boolean;
    ifTrueNextId: number;
    ifFalseNextId: number;
    inspectedItems: number;
}

export function process(data: string[], NB_ROUNDS: number): string {
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

    // Run monkeys `NB_ROUNDS` times
    const debugChecks = [1, 20];
    for (let i = 0; i < NB_ROUNDS; i++) {
        runMonkeys(monkeys);

        if (debugChecks.includes(i + 1)) {
            console.log(monkeys.map((monkeys) => monkeys.inspectedItems));
        }
    }

    // Multiply top 2 monkey's inspected items
    const sortedInspectedItems = monkeys
        .map((monkey) => monkey.inspectedItems)
        .sort((a, b) => b - a);
    return bigInt(sortedInspectedItems[0])
        .times(bigInt(sortedInspectedItems[1]))
        .toString();
}

function operationFactory(operator: "+" | "*", coef?: number) {
    if (coef === undefined) {
        return (item: Item) => item.square();
    }

    if (operator === "+") {
        return (item: Item) => item.add(coef);
    } else {
        return (item: Item) => item.times(coef);
    }
}

function testFactory(divNb: number) {
    return (item: Item) => item.mod(divNb) === bigInt(0);
}

function parsingMonkey(serializedMonkey: string[]): Monkey {
    const items = Array.from(serializedMonkey[1].matchAll(/\d+/g), (item) =>
        bigInt(item[0])
    );

    const operator: "+" | "*" = /[+]/.test(serializedMonkey[2]) ? "+" : "*";
    const parsedCoef = serializedMonkey[2].match(/\d+/);
    const coef =
        parsedCoef !== null ? Number.parseInt(parsedCoef[0]) : undefined;

    const operation = operationFactory(operator, coef);

    const divNb = Number.parseInt(serializedMonkey[3].match(/\d+/)![0], 10);
    const test = testFactory(divNb);

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
        test,
        ifTrueNextId,
        ifFalseNextId,
        inspectedItems: 0,
    };
}

/**
 * Inplace monkeys run
 */
function runMonkeys(monkeys: Monkey[]) {
    monkeys.forEach((monkey, _, arr) => {
        monkey.inspectedItems += monkey.items.length;

        // Apply operation
        monkey.items = monkey.items
            .map(monkey.operation)
            .map((item) => item.divmod(3).quotient);

        // Split based on test
        const [trueItems, falseItems] = monkey.items.reduce<[Item[], Item[]]>(
            (acc, val) => {
                if (monkey.test(val)) {
                    acc[0].push(val);
                } else {
                    acc[1].push(val);
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
