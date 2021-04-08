import uuid from "uuid-v4"
import invoicePattern from "./components/home/Print";

export function getLocalStorageKey(key) {
    const value = localStorage.getItem(key)
    return value === null ? "" : value
}

export function makeInvoice(total) {
    const myInvoice = JSON.parse(localStorage.getItem("myInvoice"));
    const shopAddress = getLocalStorageKey("shopAddress");
    const shopContact = getLocalStorageKey("shopContact");
    const shopName = getLocalStorageKey("shopName")
    const invoiceNumber = getLocalStorageKey("invoiceNumber")
    const personName = getLocalStorageKey("personName")
    const personDetail = getLocalStorageKey("personDetail")
    const GSTNumber = getLocalStorageKey("GSTNumber")
    const products = getLocalProducts();
    const invoiceId = uuid();
    const createdAt = new Date();

    if (!products.length) return

    if (!total) total = calculateTotalPrice(products)

    const invoice = {
        invoiceId,
        shopName,
        invoiceNumber,
        personName,
        personDetail,
        GSTNumber,
        products,
        shopAddress,
        shopContact,
        createdAt,
        total
    };

    if (myInvoice === null || myInvoice.length === 0) {
        const newInvoice = [];
        newInvoice.push(invoice);
        localStorage.setItem("myInvoice", JSON.stringify(newInvoice));
        resetAll()
    } else {
        const foundInvoices = myInvoice.find(
            inv => inv.invoiceNumber === invoiceNumber
        );
        if (foundInvoices === undefined) {
            myInvoice.push(invoice);
            localStorage.setItem("myInvoice", JSON.stringify(myInvoice));
            resetAll()
        }
    }

    return invoice
};

export function resetAll(params) {
    const keys = [
        "personName",
        "personDetail",
        "invoiceNumber",
    ]

    keys.forEach(k => localStorage.removeItem(k))
    clearAllProducts()
}

export function clearAllProducts(params) {
    localStorage.setItem("myProducts", JSON.stringify([]));
}

export function getLocalProducts() {
    const products = JSON.parse(localStorage.getItem("myProducts"))
    return products ? products : []
}

export function getLocalInvoices() {
    const products = JSON.parse(localStorage.getItem("myInvoice"))
    return products ? products : []
}

export function calculateTotalPrice(products) {
    return products.reduce((total, product) => {
        total = parseFloat(total) + parseFloat(product.amount);
        return total.toFixed(2);
    }, 0);
}