window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
gtag('js', new Date());
gtag('config', 'GTM-WC8GBBV');

const goToLink = ({ url = '', target = '_self', gtmAttrs = [] }) => {
    if (gtmAttrs.length === 1) {
        dataLayer.push(dataLayer.push({ 'event': gtmAttrs[0] }));
    }
    else if (gtmAttrs.length === 2) {
        dataLayer.push(dataLayer.push({
            'event': gtmAttrs[0],
            [gtmAttrs[1]] : gtmAttrs[1]
        }));
    }
    window.open(url, target);
}

const prescriptionButtonShare = document.querySelector('#sharing-prescription-btn');
const screenWidth = window.screen.width;
const modal = document.getElementById("options-modal");
const actions = document.getElementById("health-option");
const btn = screenWidth > 768
    ? document.getElementById("other-options-desktop")
    : document.getElementById("other-options-mobile");
const span = document.getElementById("close-modal");

prescriptionButtonShare.addEventListener('click',
    () => {
        navigator.share({
            title: "اشتراک‌گذاری نسخه",
            text: "اشتراک‌گذاری نسخه",
            url: window.location.href
        });
    });

const share = ({ gtmAttrs = [] }) => {
    if (gtmAttrs.length) {
        gtag(gtmAttrs[0], gtmAttrs[1]);
    }
    navigator.share({
        title: "اشتراک‌گذاری نسخه",
        text: "اشتراک‌گذاری نسخه",
        url: window.location.href
    });
}

btn.onclick = function () {
    modal.style.display = "block";
    actions.style.display = "none";
}
span.onclick = function () {
    modal.style.display = "none";
    if (screenWidth < 768) {
        actions.style.display = "block";
    }
}
window.onclick = function (event) {
    if (event.target.id === 'scheduling-desktop' || event.target.class === 'scheduling-mobile') {
        gtag('mainButton', 'Scheduling');
    }
    if (event.target.id === 'drug-delivery-desktop' || event.target.id === 'drug-delivery-mobile') {
        gtag('mainButton', 'DrugDelivery');
    }
    if (event.target.id === 'clinical-record-desktop' || event.target.id === 'clinical-record-mobile') {
        gtag('mainButton', 'ClinicalRecord');
    }
    if (event.target.id === 'other-options-desktop' || event.target.id === 'other-options-mobile') {
        gtag('secondaryButton');
    }
    switch (event.target.id) {
        case 'scheduling-prescription-btn':
            gtag('prescriptionModal', 'Scheduling');
            break;
        case 'drug-delivery-prescription-btn':
            gtag('prescriptionModal', 'DrugDelivery');
            break;
        case 'sharing-prescription-btn':
            gtag('prescriptionModal', 'Share');
            break;
        case 'download-prescription-btn':
            gtag('prescriptionModal', 'Download');
            break;
        case 'clinical-record-prescription-btn':
            gtag('prescriptionModal', 'ClinicalRecord');
            break;
    }
    if (event.target == modal) {
        modal.style.display = "none";
        if (screenWidth < 768) {
            actions.style.display = "block";
        }
    }
}