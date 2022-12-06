class Section {
    constructor(public start: number, public end: number) {}

    public includes(section: Section) {
        return this.start <= section.start && this.end >= section.end;
    }

    public overlap(section: Section) {
        return (
            (this.start <= section.start && this.end >= section.start) ||
            (this.start <= section.end && this.start >= section.end)
        );
    }
}

export function process(data: string[], withOverlap = false) {
    return (
        data
            .map((line) => {
                // Split data on comma, then split assignment on dash and return a Section instance
                const [assign1, assign2] = line.split(",").map((section) => {
                    const [start, end] = section
                        .split("-")
                        .map((item) => Number.parseInt(item, 10));
                    return new Section(start, end);
                });

                // Does one assignment includes the other
                let output =
                    assign1.includes(assign2) || assign2.includes(assign1);

                if (withOverlap) {
                    output =
                        output ||
                        assign1.overlap(assign2) ||
                        assign2.overlap(assign1);
                }
                return output;
            })
            // Sum the fully contained assignments
            .reduce((acc, val) => (val ? acc + 1 : acc), 0)
    );
}
