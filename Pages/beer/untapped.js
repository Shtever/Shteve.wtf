// untapped-optimized.js
(() => {
    "use strict";

    const CONFIG = {
        client_id: "FC8119633681CAC495EBE7A545DFE9E44106539F",
        client_secret: "191A6A679166A61D170CBF54E8F5D7CA3CAF0F42",
        usernames: ["Quille", "Mr_JFlow", "xSADBOYx", "JoeGalli"],
        api: {
            base: "https://api.untappd.com/v4",
            beerSearch: "/search/beer",
            userInfo: (u) => `/user/info/${encodeURIComponent(u)}`
        }
    };

    const qs = (sel, root = document) => root.querySelector(sel);

    const withCreds = (url, params = {}) => {
        const u = new URL(url);
        u.searchParams.set("client_id", CONFIG.client_id);
        u.searchParams.set("client_secret", CONFIG.client_secret);
        for (const [k, v] of Object.entries(params)) {
            if (v !== undefined && v !== null && v !== "") u.searchParams.set(k, v);
        }
        return u.toString();
    };

    async function getJSON(url) {
        const res = await fetch(url, { headers: { "Accept": "application/json" } });
        if (!res.ok) {
            const text = await res.text().catch(() => "");
            throw new Error(`HTTP ${res.status} ${res.statusText} – ${text?.slice(0, 180)}`);
        }
        return res.json();
    }

    function el(tag, opts = {}) {
        const node = document.createElement(tag);
        if (opts.className) node.className = opts.className;
        if (opts.text) node.textContent = opts.text;
        if (opts.attrs) for (const [k, v] of Object.entries(opts.attrs)) node.setAttribute(k, v);
        if (opts.html) node.innerHTML = opts.html;
        if (opts.children) opts.children.forEach(c => c && node.appendChild(c));
        return node;
    }

    function renderError(msg, where = qs("#results") || document.body) {
        console.error(msg);
        where.appendChild(el("div", { className: "untappd-error", text: String(msg) }));
    }

    // ---------- RENDERERS ----------
    function renderBeerResult(item, container) {
        const beer = item?.beer || {};
        const brewery = item?.brewery || {};

        const wrap = el("div", { className: "beerResult" });

        // Brewery logo first for top-left float + text wrap
        // Prefer HD if present; fall back to standard label.
        const logoUrl =
            brewery?.brewery_label_hd ||
            brewery?.brewery_label ||
            null;

        const img = logoUrl
            ? el("img", {
                className: "beerResult__img",
                attrs: {
                    src: logoUrl,
                    alt: (brewery?.brewery_name ? `${brewery.brewery_name} logo` : "Brewery logo"),
                    width: "120",
                    height: "120",
                    loading: "lazy"
                }
            })
            : null;

        const title = el("div", {
            className: "beerResult__title",
            text: beer.beer_name || "Unknown Beer"
        });

        const breweryLine = el("div", {
            className: "beerResult__brewery",
            text: brewery?.brewery_name || "Unknown Brewery"
        });

        const desc = beer.beer_description
            ? el("div", { className: "beerResult__desc", text: beer.beer_description })
            : null;

        if (img) wrap.appendChild(img);
        wrap.appendChild(title);
        wrap.appendChild(breweryLine);
        if (desc) wrap.appendChild(desc);

        container.appendChild(wrap);
    }

    function renderBeerList(items, container) {
        container.innerHTML = "";
        const header = el("div", { className: "beerResult__header", text: "Beer Search Results:" });
        container.appendChild(header);

        if (!Array.isArray(items) || items.length === 0) {
            container.appendChild(el("div", { text: "No results found." }));
            return;
        }

        const max = Math.min(items.length, 10);
        for (let i = 0; i < max; i++) {
            renderBeerResult(items[i], container);
        }
    }

    function renderUserCheckin(username, resp, container) {
        const u = resp?.response?.user;
        const check = u?.checkins?.items?.[0];
        const beer = check?.beer;
        const brewery = check?.brewery;

        const block = el("div", { className: "userCheckin" });

        block.appendChild(el("div", { className: "userCheckin__user", text: u?.user_name || username }));
        if (brewery?.brewery_name) block.appendChild(el("div", { text: brewery.brewery_name }));
        if (beer?.beer_name) block.appendChild(el("div", { text: beer.beer_name }));
        if (beer?.beer_style) block.appendChild(el("div", { text: `Style: ${beer.beer_style}` }));
        if (check?.created_at) block.appendChild(el("div", { text: String(check.created_at) }));

        container.appendChild(block);
    }

    // ---------- FEATURES ----------
    async function beerSearch(query) {
        const container = qs("#results") || document.body;
        container.innerHTML = "";

        if (!query || !query.trim()) {
            renderError("Please enter a beer name to search.", container);
            return;
        }

        try {
            const url = withCreds(
                `${CONFIG.api.base}${CONFIG.api.beerSearch}`,
                { q: query.trim(), limit: "20", sort: "name" }
            );

            const data = await getJSON(url);
            const items = data?.response?.beers?.items || [];
            renderBeerList(items, container);
        } catch (err) {
            renderError(`Beer search failed: ${err.message}`, container);
        }
    }

    async function userInfo() {
        const container = qs("#results") || document.body;
        const header = el("div", { className: "userCheckin__header", text: "Latest Check-ins:" });
        container.appendChild(header);

        for (const username of CONFIG.usernames) {
            try {
                const url = withCreds(`${CONFIG.api.base}${CONFIG.api.userInfo(username)}`);
                const data = await getJSON(url);
                renderUserCheckin(username, data, container);
            } catch (err) {
                renderError(`Failed to fetch user "${username}": ${err.message}`, container);
            }
        }
    }

    // ---------- INIT ----------
    function init() {
        const form = qs("#beerForm");
        const input = qs("#beerName");
        const anchor = qs("#div1");
        let container = qs("#results");

        if (!container) {
            container = el("div", { attrs: { id: "results" } });
            if (anchor?.parentNode) {
                anchor.parentNode.insertBefore(container, anchor.nextSibling);
            } else {
                document.body.appendChild(container);
            }
        }

        if (form) {
            form.addEventListener("submit", (e) => {
                e.preventDefault();
                beerSearch(input ? input.value : "");
            });
        }

        userInfo();
    }

    document.addEventListener("DOMContentLoaded", init);
})();
