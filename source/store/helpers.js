export function getGenres(data) {
    return data.reduce((memo, item) => {
        if (!item.genres) return memo;
        item.genres.forEach((genre) => {
            if (!memo.includes(genre)) {
                memo.push(genre);
            }
        });
        return memo;
    }, []);
}

export function getLanguages(data) {
    return data.reduce((memo, item) => {
        if (!item.language) return memo;
        item.language.forEach((lang) => {
            if (!memo.includes(lang)) {
                memo.push(lang);
            }
        });
        return memo;
    }, []);
}

export function getRated(data) {
    return data.reduce((memo, item) => {
        if (item.rated && !memo.includes(item.rated)) {
            memo.push(item.rated);
        }
        return memo;
    }, []);
}
