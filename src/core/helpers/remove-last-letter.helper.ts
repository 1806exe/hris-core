export function getEntityDatabaseId(plural: string) {
    return plural ? plural.slice(0, -1).toLowerCase() + 'Id' : '';
}
