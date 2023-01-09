import { Link } from "react-router-dom";

export default function Home() {
    const ROOT_URL = "https://github.com/sikado/aoc2022/blob/main/src/puzzles/";

    const progress: Array<{
        dayId: number;
        part1?: boolean;
        part2?: boolean;
        vizLink?: string;
    }> = [
        { dayId: 1, part1: true, part2: true },
        { dayId: 2, part1: true, part2: true },
        { dayId: 3, part1: true, part2: true },
        { dayId: 4, part1: true, part2: true },
        { dayId: 5, part1: true, part2: true },
        { dayId: 6, part1: true, part2: true },
        { dayId: 7, part1: false, part2: false },
        { dayId: 8, part1: false, part2: false },
        { dayId: 9, part1: true, part2: true },
        { dayId: 10, part1: true, part2: true },
        { dayId: 11, part1: true, part2: true },
        { dayId: 12, part1: true, part2: true, vizLink: "/day_12" },
        { dayId: 13, part1: false, part2: false },
        { dayId: 14, part1: true, part2: true },
        { dayId: 15, part1: false, part2: false },
        { dayId: 16 },
        { dayId: 17 },
        { dayId: 18 },
    ];

    const rows = progress.map((day) => (
        <tr key={day.dayId}>
            <td scope="row">{day.dayId}</td>
            <td>{day.part1 === true ? "✅" : ""}</td>
            <td>{day.part2 === true ? "✅" : ""}</td>
            <td>
                {day.vizLink != null ? (
                    <>
                        <Link to={day.vizLink}>Voir la viz</Link> <br />
                    </>
                ) : (
                    ""
                )}

                {day.part1 === true || day.part2 === true ? (
                    <a
                        target={"_blank"}
                        href={`${ROOT_URL}day_${day.dayId}/index.ts`}
                    >
                        Voir sur github
                    </a>
                ) : (
                    ""
                )}
            </td>
        </tr>
    ));

    return (
        <>
            <table className="table table-bordered align-middle">
                <thead>
                    <tr>
                        <th scope="col">Day</th>
                        <th scope="col">Part 1</th>
                        <th scope="col">Part 2</th>
                        <th scope="col">Viz</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">{rows}</tbody>
            </table>
        </>
    );
}
