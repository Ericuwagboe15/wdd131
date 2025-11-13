const lastModified = new Date(document.lastModified);
const options = { year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", second: "numeric"}
document.getElementById("lastModified").innerHTML = "Last Modified: " + lastModified.toLocaleString("en-us", options)