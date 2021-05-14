export function sortFn(array: any[], key: string, asc: boolean = true, ip?: boolean): any[] {
    array.sort((a, b) => ip ? compareIpAddresses(a[key], b[key], asc) : compareProperties(a, b, key, asc));

    return array;
}

function compareIpAddresses(a: string, b: string, asc: boolean = true): number {
    const num1 = Number(a.split('.').map((num) => (`000${num}`).slice(-3)).join(''));
    const num2 = Number(b.split('.').map((num) => (`000${num}`).slice(-3)).join(''));

    return asc ? num1 - num2 : num2 - num1;
}

function compareProperties(a: any, b: any, key: string, asc: boolean = true): number {
        const aKey = a[key];
        const bKey = b[key];
        let result = null;
        if (typeof aKey === 'string' && typeof bKey === 'string') {
            result =
                aKey.toLowerCase() < bKey.toLowerCase()
                    ? asc
                    ? -1
                    : 1
                    : asc
                    ? 1
                    : -1;
        } else {
            if (aKey === null || typeof (aKey) === 'undefined') {
                result = 1;
            } else if (bKey === null || typeof (bKey) === 'undefined') {
                result = -1;
            } else {
                result = aKey < bKey ? (asc ? -1 : 1) : asc ? 1 : -1;
            }
        }
        return result;
}
