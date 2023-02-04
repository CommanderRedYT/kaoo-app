export function capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export const getSearchParamFromURL = (url: string, param: string) => {
    const include = url.includes(param);

    if (!include)
        return null;

    const params = url.split(/([&,?,=])/);
    const index = params.indexOf(param);
    const value = params[index + 2];
    return value;
}

export const rsplit = (str: string, sep: string, maxsplit: number) => {
    const split = str.split(sep);
    return maxsplit ? [split.slice(0, -maxsplit).join(sep)].concat(split.slice(-maxsplit)) : split;
}
