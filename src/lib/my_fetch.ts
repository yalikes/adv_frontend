import { SERVER_URL } from "./constants";

export function fetch_post_json(path: string, json: string) {
    return fetch("http://" + SERVER_URL + path, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: json
    }).then((resp) => {
        return resp.json();
    });
}