import { route } from "../router";
import "./style/main.css";

route("/", function () {
  this.where = "here";
});

route("/ex1", function () {
  this.title = "Example 1";
  this.counter = 0;
});

route("*", function () {
  this.title = "not found";
});
