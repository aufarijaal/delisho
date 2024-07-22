import { prettyDigits as p } from "prettydigits";

export default function prettyDigits(num: number) {
    return p(num, {
        tolowercase: true,
    });
}
