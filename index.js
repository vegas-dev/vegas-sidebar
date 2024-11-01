import "./app/scss/app.scss";
import VGSidebar from "./app/js/app";

[...document.querySelectorAll('[data-vg-toggle="sidebar"]')].forEach(function (btn) {
	VGSidebar.makeInit(btn);
});

export {
	VGSidebar
}
