import React from "react";
import RaphaelChord from "../etc/raphael.chord";

export default class Chordify extends React.Component {

    constructor(props) {
        super(props);

        this.regex = /\[(\b[A-G](?:(?:add|dim|aug|maj|mM|mMaj|sus|m|b|#|\d)?(?:\/[A-G0-9])?)*(?!\||—|-|\.|:)(?:\b|#)+)]/;
        this.input = props.input;
    }

    componentDidMount() {

    }

    wrap = () => {
        return this.input.replace(this.regex, chord => <a>{this.removeBraces(chord)}</a>);
    };

    all = () => {
        const matches = this.input.match(this.regex);

        if (!matches) {
            return [];
        }

        const matchesNormal = matches.map(match => this.removeBraces(match));

        return matchesNormal.sort((a, b) => {
            a = a.toLowerCase();
            b = b.toLowerCase();
            return a > b ? 1 : a < b ? -1 : 0;
        });
    };

    unique = () => {
        return this.all().filter((chord, index, arr) => arr.indexOf(chord) === index);
    };

    renderUnique() {
        var unique = this.unique();

        unique.forEach(chord => {
            const className = "id" + chord;
            RaphaelChord.chord(className, chord);
            return <div className={className}></div>
        });
    };

    removeBraces = chord => chord.replace(/\[(.+)]/, "$1");

    render() {
        return (
            <div>{this.wrap()}</div>
        )
    }
}
