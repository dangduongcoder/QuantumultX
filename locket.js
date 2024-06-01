/*

hostname = api.revenuecat.com

^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/[^/]+$) url script-request-header headers.js

#-----------

^https:\/\/api\.revenuecat\.com\/.+\/(receipts$|subscribers\/[^/]+$) url script-response-body locket.js
*/

const mapping = { 'Locket': ['Gold'] };
let ua = $request.headers["User-Agent"] || $request.headers["user-agent"],
    obj = JSON.parse($response.body);
let locket = {
        is_sandbox: !1,
        ownership_type: "PURCHASED",
        billing_issues_detected_at: null,
        period_type: "normal",
        expires_date: "2025-12-18T01:04:17Z",
        grace_period_expires_date: null,
        unsubscribe_detected_at: null,
        original_purchase_date: "2024-04-09T01:04:18Z",
        purchase_date: "2024-04-09T01:04:17Z",
        store: "app_store"
    },
    locketpro = {
        grace_period_expires_date: null,
        purchase_date: "2024-04-09T01:04:17Z",
        product_identifier: "com.locket.premium.yearly",
        expires_date: "2025-12-18T01:04:17Z"
    };
const match = Object.keys(mapping).find(e => ua.includes(e));
if (match) {
    let [e, s] = mapping[match];
    s ? (locketpro.product_identifier = s, obj.subscriber.subscriptions[s] = locket) : obj.subscriber.subscriptions["com.locket.premium.yearly"] = locket, obj.subscriber.entitlements[e] = locketpro
} else obj.subscriber.subscriptions["com.locket.premium.yearly"] = locket, obj.subscriber.entitlements.pro = locketpro;
$done({
    body: JSON.stringify(obj)
});