export const toFormattedDateTime = (date: string | undefined | number) => {
    if (!date) {
        return "";
    }

    return new Date(date).toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    }).replace(/\//g, ".").replace(',', '')
}

export const toFormattedDate = (date?: string) => {
    if (!date) {
        return ''
    }

    return new Date(date).toLocaleString("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    }).replace(/\//g, ".").replace(',', '')
}
