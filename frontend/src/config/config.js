// const endpoint = "http://154.223.19.130:5000"
// const endpoint = "http://localhost:10000"
// const endpoint = "http://38.60.163.86:8000";
// const endpoint = "http://localhost:8000";
// const endpoint = "https://bandback-production.up.railway.app";
const endpoint = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export default endpoint;
