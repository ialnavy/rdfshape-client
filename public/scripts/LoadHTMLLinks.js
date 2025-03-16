document.addEventListener("DOMContentLoaded", () => {
    let links = [
        { rel: "shortcut icon", href: ((new String(window.location.origin)).toString()).concat("/favicon.ico") },
        { rel: "manifest", href: ((new String(window.location.origin)).toString()).concat("/app.webmanifest") },
        // { rel: "preconnect", href: URI_TO_RDFSHAPE_API }
    ];

    links.forEach(linkData => {
        let link = document.createElement("link");
        Object.entries(linkData).forEach(([key, value]) => {
            link[key] = value;
        });
        document.querySelector("head").appendChild(link);
    });
});
