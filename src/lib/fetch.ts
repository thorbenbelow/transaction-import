export function fetchApi(path: string, options?: RequestInit): Promise<Response> {
    const url = new URL("/api" + path, "http://localhost:3000/")
    return fetch(url, options)
}

export async function getJson<T>(path: string): Promise<T> {
    const res = await fetchApi(path)
    const payload = await res.json()
    return payload.data
}

export async function postJson(path: string, data: any) {
    const body = JSON.stringify(data)
    const res = await fetchApi(path, {method: "POST", headers: {"Content-Type": "application/json"}, body})
    const payload = await res.json()
    return payload.data
}

export async function patchJson(path: string, data: any) {
    const body = JSON.stringify(data)
    const res = await fetchApi(path, {method: "PATCH", headers: {"Content-Type": "application/json"}, body})
    const payload = await res.json()
    return payload.data
}
