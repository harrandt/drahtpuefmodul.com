import resourcesToBackend from 'i18next-resources-to-backend';

export const libResourcesToBackend = () => {
    return resourcesToBackend((language, namespace, callback) => {
        import(`../assets/${language}_${namespace}.json`)
            .then((resources) => {
                callback(null, resources.default);
            })
            .catch((error) => {
                callback(error, null);
            });
    });
};
