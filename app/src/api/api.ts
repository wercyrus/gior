export function PostData(url: string, body: object, rejectWithValue?: Function) {
    return fetch(url, {
        method: "POST",
        body: JSON.stringify(body)
    }).then((reponse) => {
        return reponse.json().then((data) => {
            return { errors: null, data, isOk: reponse.ok }
        }).catch((e) => {
            return { errors: e, data: null, isOk: false }
        });
    }).catch((e) => {
        rejectWithValue && rejectWithValue(e.response?.data);
        return { errors: e, data: null, isOk: false }
    })
}