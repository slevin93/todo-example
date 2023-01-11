var app = new Vue({
  el: "#app",
  data: {
    todoItem: {
      item: "",
      isActive: true,
    },
    todoItems: [],
  },
  methods: {
    addItem: async function () {
      const todoItem = await fetch("/todos", {
        method: "POST",
        body: JSON.stringify(this.todoItem),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      this.todoItems.push(await todoItem.json());
      this.todoItem.item = "";
    },
    updateItem: async function (todoItem) {
      todoItem.isActive = false;
      await fetch("/todos", {
        method: "PUT",
        body: JSON.stringify(todoItem),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    },
  },
  mounted: async function () {
    Metro.init();
    const todoItems = await fetch("/todos");
    this.todoItems = await todoItems.json();
  },
});
