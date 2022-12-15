import "./index.html";
import "./main.scss";
import Filters from "./components/filters/filters";

const filters = new Filters();
document.body.appendChild(filters.render());
