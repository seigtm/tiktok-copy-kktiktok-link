// ==UserScript==
// @name         TikTok Copy KK Link (Floating Button)
// @namespace    https://kktiktok-helper
// @version      1.1
// @description  Floating button to copy kktiktok.com links for Telegram embedding
// @match        https://www.tiktok.com/*
// @updateURL    https://github.com/seigtm/tiktok-copy-kktiktok-link/raw/refs/heads/master/tiktok-copy-kktiktok-link.user.js
// @downloadURL  https://github.com/seigtm/tiktok-copy-kktiktok-link/raw/refs/heads/master/tiktok-copy-kktiktok-link.user.js
// @grant        none
// ==/UserScript==

// USAGE:
//   1. Open tiktok.com
//   2. Open the comments section of a video (this switches the URL to /video/...)
//   3. You should now see the "Copy KK link" button
//   4. Click the button to copy the kktiktok.com link to your clipboard
//   5. Paste the link into Telegram to share an embedded, playable video

(function () {
    'use strict';

    const BUTTON_ID = 'kk-copy-floating-btn';

    function getKKUrl() {
        return location.href.replace('www.tiktok.com', 'kktiktok.com');
    }

    function copyKKUrl() {
        const url = getKKUrl();
        navigator.clipboard.writeText(url).then(() => {
            showToast('KK link copied');
        });
    }

    function showToast(text) {
        const toast = document.createElement('div');
        toast.textContent = text;
        toast.style.cssText = `
            position: fixed;
            bottom: 24px;
            right: 24px;
            background: rgba(0,0,0,0.85);
            color: white;
            padding: 8px 12px;
            border-radius: 6px;
            font-size: 13px;
            z-index: 100000;
            font-family: system-ui, sans-serif;
        `;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 1200);
    }

    function ensureButton() {
        if (document.getElementById(BUTTON_ID)) return;

        // Show button on video pages ONLY!
        if (!location.pathname.includes('/video/')) return;

        const btn = document.createElement('button');
        btn.id = BUTTON_ID;
        btn.textContent = 'Copy KK link';
        btn.onclick = copyKKUrl;

        btn.style.cssText = `
            position: fixed;
            right: 16px;
            bottom: 80px;
            padding: 10px 14px;
            background: #ff0050;
            color: white;
            border: none;
            border-radius: 999px;
            cursor: pointer;
            font-size: 14px;
            font-weight: 500;
            z-index: 100000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.35);
        `;

        document.body.appendChild(btn);
    }

    let lastUrl = location.href;
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            document.getElementById(BUTTON_ID)?.remove();
            ensureButton();
        }
    }, 500);

    ensureButton();
})();
