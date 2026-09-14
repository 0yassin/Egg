const API_URL = "http://127.0.0.1:8000";
export async function apifetch(endpoint:string) {
    const response = await fetch(`${API_URL}${endpoint}`);
    if (!response.ok){
        throw new Error(`API Error: ${response.status}`)
    }
    return response.json();
}